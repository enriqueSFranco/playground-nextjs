'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { Breadcrumbs } from '@/components/organisms/Breadcrumbs/Breadcrumbs';
import { Debugguer } from '@/components/atoms/Debugguer/Debugguer';
import { CVPreview } from './components/organisms/CVPreview';

import {
  getCurrentStepIndex,
  getNextStep,
  getPrevStep,
  getStepConfig,
} from '../lib/utils';

import { STEPS } from './steps';
import { $editorStore } from '../_shared-store/editor';

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const data = $editorStore.selectors.useCurriculumData();

  // State del paso actual sincronizado con la URL
  const [currentStep, setCurrentStep] = useState(() => {
    return searchParams.get('step') || STEPS[0].href;
  });

  // Escuchamos cambios en los query params
  useEffect(() => {
    const step = searchParams.get('step') || STEPS[0].href;
    setCurrentStep(step);
  }, [searchParams]);

  const currentStepIndex = getCurrentStepIndex(currentStep);
  const nextStep =
    currentStepIndex !== -1 ? getNextStep(currentStepIndex) : null;
  const prevStep =
    currentStepIndex !== -1 ? getPrevStep(currentStepIndex) : null;

  // Navega actualizando la URL
  function navigateToStep(newStep: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', newStep);
    router.push(`?${params.toString()}`);
  }

  // Valida antes de cambiar de paso
  function handleStepNavigation(step: string | null) {
    if (!step || currentStep === null) return;

    const currentConfig = getStepConfig(currentStep);
    if (!currentConfig) return;

    const { storeKey, schema } = currentConfig;
    const currentFormData = data[storeKey];
    const result = schema.safeParse(currentFormData);

    if (!result.success) {
      console.warn(`Errores en el paso "${storeKey}"`, result.error.format());
      return; // No avanzar si hay errores
    }

    // Si pasa validación, navegamos
    navigateToStep(step);
  }

  const CurriculumForm = getStepConfig(currentStep)?.component || null;

  return (
    <div className="flex grow flex-col">
      <header className="text-balance flex flex-col items-center pb-3 text-sm dark:border-b-[1px] dark:border-b-white/20">
        <h2 className="text-2xl font-bold">Crea tu currículum fácilmente</h2>
        <p className="text-sm">
          Completa los pasos para crear tu currículum. El progreso se guardará
          automáticamente en cada paso.
        </p>
      </header>

      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div className="w-full space-y-6 overflow-y-auto p-3 md:block md:w-1/2">
            <Breadcrumbs
              breadcrumbs={STEPS}
              currentStep={currentStep}
              updateStepInURL={navigateToStep}
            />

            {CurriculumForm ? (
              <CurriculumForm key={currentStep} />
            ) : (
              <strong>No hay componente disponible para este paso</strong>
            )}
          </div>
          <div className="grow md:border-r md:border-white/20" />
          <CVPreview />
        </div>
      </main>

      <footer className="flex justify-around p-5">
        <div className="flex gap-10">
          <Button
            color="PRIMARY"
            disabled={!prevStep}
            onClick={() => handleStepNavigation(prevStep)}
            className={`capitalize ${!prevStep ? 'cursor-not-allowed' : ''}`}
          >
            anterior
          </Button>

          <Button
            color="DEFAULT"
            disabled={!nextStep}
            onClick={() => handleStepNavigation(nextStep)}
            className={`outline outline-white/20 ${!nextStep ? 'cursor-not-allowed' : ''}`}
          >
            siguiente
          </Button>
        </div>
        <Button color="DANGER">cerrar</Button>
      </footer>

      <Debugguer data={data} />
    </div>
  );
}
