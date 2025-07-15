import { ResumeFormSectionsType } from "@/shared/constants";

type ResumeStepsProps = {
  forms: ResumeFormSectionsType[];
};

export function ResumeSectionLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex flex-col gap-y-1 overflow-y-scroll bg-white rounded-md">
      {children}
    </div>
  )
}
