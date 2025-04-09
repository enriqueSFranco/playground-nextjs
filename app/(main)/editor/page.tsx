'use client';

import { useSearchParams } from 'next/navigation';
import {Button} from '@/components/atoms/Button/Button';
import { Breadcrumbs } from '@/components/organisms/Breadcrumbs/Breadcrumbs';
import { Debugguer } from '@/components/atoms/Debugguer/Debugguer';
import {
  getCurrentStepIndex,
  getNextStep,
  getPrevStep,
  getStepConfig,
} from '../lib/utils';
import { CVPreview } from './components/organisms/CVPreview';
import { STEPS } from './steps.d';
import { $editorStore } from '../_shared-store/editor';

export default function Page() {
  const searchParams = useSearchParams();
  const data = $editorStore.selectors.useCurriculumData()
  const currentStep = searchParams.get('step') || STEPS[0].href;

  const currentStepIndex = getCurrentStepIndex(currentStep);
  const nextStep =
    currentStepIndex !== -1 ? getNextStep(currentStepIndex) : null;
  const prevStep =
    currentStepIndex !== -1 ? getPrevStep(currentStepIndex) : null;

  function navigateToStep(newStep: string) {
    const url = new URLSearchParams(searchParams);
    url.set('step', newStep);
    window.history.pushState({ state: newStep }, '', `?${url.toString()}`);
  }

  function handleStepNavigation(step: string | null) {
    return step ? () => navigateToStep(step) : undefined;
  }

  const CurriculumForm = getStepConfig(currentStep)
    ? getStepConfig(currentStep)?.component
    : null;

  return (
    <div className='flex grow flex-col'>
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
                <CurriculumForm />
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
            color='PRIMARY'
            disabled={!prevStep}
            onClick={handleStepNavigation(prevStep)}
            className={`capitalize ${!prevStep ? 'cursor-not-allowed' : ''}`}
          >
            anterior
          </Button>
          <Button
            color='DEFAULT'
            disabled={!nextStep}
            onClick={handleStepNavigation(nextStep)}
            className={`outline-white/20 outline ${!nextStep ? 'cursor-not-allowed' : ''}`}
          >
            siguiente
          </Button>
        </div>
        <Button color='DANGER'>cerrar</Button>
      </footer>
      <Debugguer data={data} />
    </div>
  );
}
