import { $editorStore } from "@/app/(main)/_shared-store/editor";
import { cn } from "@/app/(main)/lib/utils";
import { useDimension } from "@/hooks/useDimension";
import { useRef } from "react";
import { PersonalInfoHeader } from "../organisms/PersonalInfoHeader";
import { SummarySection } from "../organisms/SummarySection";
import { WorkExperienceSection } from "../organisms/WorkExperienceSection";

export function CVPreviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimension({ containerRef });
  const data = $editorStore.selectors.useCurriculumData();

  const { personalInfo, professionalProfile, workExperience } = data;
  
  return (
    <div
      className={cn('aspect-[210/297] h-fit w-full bg-white text-black')}
      ref={containerRef}
    >
      <div
        className={cn(
          'flex w-full flex-col justify-center overflow-y-auto',
          !width && 'invisible',
        )}
        style={{ zoom: (1 / 794) * width }}
      >
        <PersonalInfoHeader personalInfo={personalInfo} />
        <SummarySection professionalSumary={professionalProfile} />
        <WorkExperienceSection workExperiences={workExperience} />
      </div>
    </div>
  );
}
