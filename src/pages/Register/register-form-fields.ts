export interface IRegisterFormFields {
  username: string;
  password: string;
  password2: string;
  email: string;
  first_name: string;
  last_name: string;
}

export type RegisterFormFieldNamesType = keyof IRegisterFormFields;

export type RegisterFormFieldsType = {
  name: RegisterFormFieldNamesType;
  type: "text" | "password" | "email";
  label: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  notEditable?: boolean;
};

export const registerFormFieldsNamesArray = [
  "username",
  "password",
  "password2",
  "email",
  "first_name",
  "last_name",
] as const;

export const editableRegisterFormFieldsNamesArray = [
  "username",
  "email",
  "first_name",
  "last_name",
] as const;
