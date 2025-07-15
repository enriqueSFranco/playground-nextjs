export type FieldErrors = {
  email?: string[];
  password?: string[];
};

export type GeneralErrors = {
  general?: string[];
};

export type FormState = {
  success: boolean;
  errors?: FieldErrors & GeneralErrors;
  message?: string;
  data?: {
    email: string;
    password: string;
  };
};
