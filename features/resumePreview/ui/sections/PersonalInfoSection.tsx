import { PersonalDetails } from '@/shared/types';
import { forwardRef, Fragment } from 'react';

type Props = {
  data: PersonalDetails;
};

export const PersonalInfoSection = forwardRef<HTMLElement, Props>(
  ({ data }, ref) => {

    if (!data) return null

    const { firstName, lastName, job, email, phone } = data;
    const contactInfo = { email, phone };
    const fullName = [firstName, lastName].filter(Boolean).join(' ');
    const hasContact = email || phone;

    return (
      <section
        aria-labelledby="resume-personalInfo"
        role="region"
        data-testid="resume-personalInfo"
        ref={ref}
      >
        <div
          className="flex flex-col items-start text-gray-500"
          data-testid="resume-personalInfo-details"
        >
          <div className="flex w-full items-center justify-between">
            {fullName && (
              <h2
                className="block w-full whitespace-pre-wrap text-2xl font-semibold tracking-wide text-gray-500"
                data-testid="resume-fullName"
              >
                {fullName}
              </h2>
            )}
            {hasContact && (
              <ul
                className="flex w-full items-start justify-end gap-1"
                aria-label="Información de contacto"
                data-testid="resume-contact"
              >
                {Object.entries(contactInfo).filter(
                  ([_, value], index, arr) => {
                    return (
                      <Fragment key={`contact-${value}`}>
                        <li>
                          <span className="text-sm">{value}</span>
                        </li>
                        {index < arr.length - 1 && (
                          <li aria-hidden="true">
                            <span className="text-xl">&#8226;</span>
                          </li>
                        )}
                      </Fragment>
                    );
                  },
                )}
              </ul>
            )}
          </div>
          {job && (
            <h3
              className="text-xl font-light text-gray-500"
              data-testid="resume-job"
            >
              {job}
            </h3>
          )}
        </div>
      </section>
    );
  },
);
PersonalInfoSection.displayName = 'PersonalInfoSection';
