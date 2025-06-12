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
  // console.log(searchParams?.show)
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
    <div className="flex min-h-screen flex-col">
      <header className="flex flex-col items-center space-y-2 pb-6 text-sm dark:border-b-[1px] dark:border-b-white/20">
        <h2 className="text-3xl text-gray-600 dark:text-gray-300">
          Crea tu currículum fácilmente
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Completa los pasos para crear tu currículum. El progreso se guardará
          automáticamente en cada paso.
        </p>
      </header>

      <main className="grid grow cols-1 lg:grid-cols-2 overflow-y-auto">
        <div className="flex w-full flex-col px-6">
          <div>
            <Breadcrumbs
              breadcrumbs={STEPS}
              currentStep={currentStep}
              updateStepInURL={navigateToStep}
            />
          </div>
          {CurriculumForm ? (
            <CurriculumForm key={currentStep} />
          ) : (
            <strong>No hay componente disponible para este paso</strong>
          )}
        </div>
        <CVPreview />
      </main>

      <footer className="w-full h-20 bg-white flex justify-between dark:bg-black">
        <div className="flex items-center justify-center space-x-12 w-full">
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
        <div className="flex items-center justify-center gap-10 w-full">
          <Button color="DANGER">cerrar</Button>
        </div>
      </footer>

      {/* <Debugguer data={data} /> */}
    </div>
  );
}
