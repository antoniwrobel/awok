export interface ILoginFormFields {
  username: string;
  password: string;
}

export type LoginFormFieldNamesType = keyof ILoginFormFields;

export type LoginFormFieldsType = {
  name: LoginFormFieldNamesType;
  type: "text" | "password";
  label: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
};

export const loginFormFieldsNamesArray = ["username", "password"] as const;
