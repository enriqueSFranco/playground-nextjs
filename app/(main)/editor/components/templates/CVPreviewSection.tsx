import { $editorStore } from "@/app/(main)/_shared-store/editor";
// import { cn } from "@/app/(main)/lib/utils";
import { useDimension } from "@/hooks/useDimension";
import { useRef } from "react";
import { PersonalInfoHeader } from "../organisms/PersonalInfoHeader";
import { SummarySection } from "../organisms/SummarySection";
import { WorkExperienceSection } from "../organisms/WorkExperienceSection";

export function CVPreviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimension({ containerRef });
  const data = $editorStore.selectors.useCurriculumData();

  const BASE_WIDTH = 794; // ancho A4 en px
  const BASE_HEIGHT = 1123; // alto A4 en px
  const scale = Math.min(width / BASE_WIDTH, 1)
  const { personalInfo, professionalProfile, workExperience } = data;

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        // backgroundColor: '#f0f0f0',
        boxSizing: 'border-box',
      }}
    >

    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${BASE_WIDTH}px`,
        height: `${BASE_HEIGHT}px`,
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)',
        border: '1px solid #e0e0e0',
      }}
    >
      <PersonalInfoHeader personalInfo={personalInfo} />
      <SummarySection professionalSumary={professionalProfile} />
      <WorkExperienceSection workExperiences={workExperience} />
    </div>
    </div>
  );
}
