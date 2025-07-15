'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDeviceType } from '@/hooks/useDeviceType';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Debugguer } from '@/ui/atoms/Debugguer/Debugguer';
import fakeResume from '@/mocks/resume.json';
import { PersonalInfoSection } from '@/features/resumePreview/ui/sections/PersonalInfoSection';
import { SummarySection } from '@/features/resumePreview/ui/organisms/SummarySection';
import { WorkExperienceSection } from '@/features/resumePreview/ui/sections/WorkExperienceSection';
import { useSectionHeight } from '@/features/resumePreview/hooks/useSectionHeights';
import { ResumePreviewLayout } from '@/features/resumePreview/layout/ResumePreviewLayout';
import { A4Page } from '@/features/resumePreview/ui/A4Page';
import { ResumePreviewButton } from '@/features/resumeEditor/ui/atoms/ResumePreviewButton';
import { A4_PAGE } from '@/features/resumePreview/constants.d';
import { useAppSelector } from '@/lib/redux/hooks';
import { selectResumeState } from '@/lib/redux/features/resume/resume.selector';
import { ResumeSectionLayout } from '@/features/resumeEditor/ui/templates/resume-section-layout';
import { resumeFormSections } from '@/shared/constants';

const { personalDetails, careerSummary, employmentHistory } = fakeResume;

type SectionKey = 'personal-details' | 'career-summary' | 'employment-history';
type ResumeSectionConfig = {
  key: SectionKey;
  component: React.ForwardRefExoticComponent<any>;
  data: any;
};

const RESUME_SECTIONS_CONFIG: ResumeSectionConfig[] = [
  {
    key: 'personal-details',
    component: PersonalInfoSection,
    data: personalDetails,
  },
  { key: 'career-summary', component: SummarySection, data: careerSummary },
  // {
  //   key: 'employment-history',
  //   component: WorkExperienceSection,
  //   data: employmentHistory,
  // },
];

type PageContent = {
  id: string;
  sections: Array<{
    key: SectionKey;
    component: React.ForwardRefExoticComponent<any>;
    data: any;
    // Props específicas para el fragmento de la sección en esta página
    props?: Record<string, any>;
  }>;
};

type SectionRefs = {
  'personal-details'?: HTMLElement | null;
  'career-summary'?: HTMLElement | null;
  'employment-history'?: HTMLElement | null;
};

export default function Page() {
  const assignedInitialRefKeys = useRef(new Set<SectionKey>());
  const sectionRefs = useRef<SectionRefs>({});
  const [areAllInitialSectionsMounted, setAreAllInitialSectionsMounted] =
    useState(false);
  const [paginatedPages, setPaginatedPages] = useState<PageContent[]>([]);
  const [allInitialHeightsReady, setAllInitialHeightsReady] = useState(false);
  const resumeData = useAppSelector(selectResumeState);

  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const visibilityMap = useIntersectionObserver([topRef, bottomRef], {
    threshold: 0.01,
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const { isBreakpoint } = useDeviceType();
  const sectionKeysToObserve = useMemo(
    () => RESUME_SECTIONS_CONFIG.map((config) => config.key),
    [],
  );
  const sectionHeights = useSectionHeight({
    keys: sectionKeysToObserve,
    refs: sectionRefs,
  });

  const getInitialRefCallback = useCallback(
    (key: SectionKey) => (node: HTMLElement | null) => {
      if (node && !sectionRefs.current[key]) {
        sectionRefs.current[key] = node;
        assignedInitialRefKeys.current.add(key);

        if (
          assignedInitialRefKeys.current.size === RESUME_SECTIONS_CONFIG.length
        ) {
          setAreAllInitialSectionsMounted(true);
        }
      }
    },
    [],
  );

  useEffect(() => {
    console.log('--- Depuración: useEffect para allInitialHeightsReady ---');
    console.log('Estado actual: areAllInitialSectionsMounted:', areAllInitialSectionsMounted);
    console.log('Estado actual: sectionHeights:', sectionHeights); // ¿Qué valores tiene?
    console.log('Estado actual: allInitialHeightsReady (antes de la lógica):', allInitialHeightsReady);
    console.log('sectionKeysToObserve:', sectionKeysToObserve);

    if (!areAllInitialSectionsMounted) {
        console.log('Condición de salida: areAllInitialSectionsMounted es FALSE. Saliendo del efecto.');
        return;
    }
    console.log('areAllInitialSectionsMounted es TRUE. Continuando la evaluación...');

    const currentKeys = Object.keys(sectionHeights);
    const hasAllHeights = sectionKeysToObserve.every(key =>
      currentKeys.includes(key) && sectionHeights[key] !== undefined && sectionHeights[key] > 0
    );

    console.log('Claves en sectionHeights (currentKeys):', currentKeys);
    console.log('¿Tiene todas las alturas válidas (hasAllHeights)?', hasAllHeights);

    if (hasAllHeights && !allInitialHeightsReady) {
      console.log('✅ Condición cumplida: Estableciendo allInitialHeightsReady a TRUE. Todas las alturas válidas presentes.');
      setAllInitialHeightsReady(true);
    } else if (!hasAllHeights && allInitialHeightsReady) {
        console.log('❌ Condición fallida: Reseteando allInitialHeightsReady a FALSE. Faltan alturas o alguna es 0.');
        setAllInitialHeightsReady(false);
    }
    console.log('--- Fin Depuración: useEffect para allInitialHeightsReady ---');
  }, [
    areAllInitialSectionsMounted,
    allInitialHeightsReady,
    sectionHeights, // CRÍTICO: ¿Este objeto cambia?
    sectionKeysToObserve
  ]);

  useEffect(() => {
    if (!allInitialHeightsReady) {
      setPaginatedPages([]);
      return;
    }
    console.log('🚀 useEffect de paginación EJECUTADO!');
    console.log('Iniciando cálculo de paginación con alturas:', sectionHeights);

    const pages: PageContent[] = [];
    let currentPageHeight = 0;
    let currentPageIndex = 0;
    let currentSectionsForPage: PageContent['sections'] = [];

    const addNewPage = () => {
      if (currentSectionsForPage.length > 0) {
        pages.push({
          id: `page-${currentPageIndex}`,
          sections: currentSectionsForPage,
        });
      }
      currentPageIndex++;
      currentSectionsForPage = [];
      currentPageHeight = 0;
    };
    // Asegura que siempre hay una página inicial
    console.log('📄 Asegura que siempre hay una página inicial');
    addNewPage();

    for (const sectionConfig of RESUME_SECTIONS_CONFIG) {
      const sectionKey = sectionConfig.key;
      const sectionHeight = sectionHeights[sectionKey];
      if (sectionHeight === undefined || sectionHeight === null) {
        console.warn(
          `Altura para la sección ${sectionKey} no disponible en sectionHeights.`,
        );
        continue;
      }
      // logica para la paginación
      if (currentPageHeight + sectionHeight > A4_PAGE.HEIGHT) {
        addNewPage();
      }
      currentSectionsForPage.push({
        key: sectionConfig.key,
        component: sectionConfig.component,
        data: sectionConfig.data,
      });
      currentPageHeight += sectionHeight;
    }
    if (currentSectionsForPage.length > 0) {
      addNewPage();
    } else if (pages.length === 0) {
      // Asegura al menos una página si no hay secciones
      addNewPage();
    }
    console.log('Page - paginatedPages antes de setear:', pages);
    setPaginatedPages(pages);
  }, [allInitialHeightsReady, sectionHeights, resumeData]);

  function handleOpenCvPreview() {
    const params = new URLSearchParams(searchParams.toString());
    params.set('cvId', '1');
    router.push(`/editor/cv-preview?id=${params.toString()}`);
  }

  const isSmallScreen = isBreakpoint([
    'mobile',
    'mobileLarge',
    'tablet',
    'tabletLarge',
  ]);

  const isExpanded = visibilityMap.top || visibilityMap.bottom;
  console.log('total de paginas: ', paginatedPages);
  return (
    <div className="flex-1 flex-grow">
      {/* Sentinelas invisibles para intersection observer */}
      {isSmallScreen && (
        <div id="top" ref={topRef} className="absolute top-0 h-1 w-full" />
      )}
      <main className="flex h-screen overflow-y-auto">
        <div className="w-1/2 flex-shrink-0 bg-gray-100 px-4 py-6 max-sm:w-full max-sm:flex-1">
          <ResumeSectionLayout>
            {resumeFormSections.map((resumeSection) => {
              const FormComponent = resumeSection.component;
              return <FormComponent key={resumeSection.key} />;
            })}
          </ResumeSectionLayout>
        </div>
        {!isSmallScreen && (
          <div className="sticky top-0 h-screen w-1/2 flex-shrink-0">
            <ResumePreviewLayout>
              <div
                style={{
                  position: 'absolute',
                  visibility: 'hidden',
                  height: 0,
                  overflow: 'hidden',
                }}
              >
                {RESUME_SECTIONS_CONFIG.map((section) => {
                  const ResumeSection = section.component;
                  return (
                    <ResumeSection
                      key={`initial-measure-${section.key}`}
                      ref={getInitialRefCallback(section.key)}
                      data={section.data}
                    />
                  );
                })}
              </div>

              {paginatedPages.length > 0 ? (
                paginatedPages.map((page, pageIdx) => (
                  <A4Page key={page.id} pageNumber={pageIdx + 1}>
                    {page.sections.map((section, sectionIdx) => {
                      const Component = section.component;
                      return (
                        <Component
                          key={`${section.key}-${page.id}-${sectionIdx}`}
                          data={section.data}
                          {...section.props}
                        />
                      );
                    })}
                  </A4Page>
                ))
              ) : (
                <p className="text-center">Calculando páginas del CV...</p>
              )}
            </ResumePreviewLayout>
          </div>
        )}
      </main>
      {isSmallScreen && (
        <div id="bottom" ref={bottomRef} className="h-1 w-full" />
      )}
      {/* mostar solo cuando es mobile o mobileL */}
      {isSmallScreen && (
        <ResumePreviewButton
          isExpanded={isExpanded}
          onNavigateToPreview={handleOpenCvPreview}
        />
      )}
      <Debugguer data={resumeData} />
    </div>
  );
}
