interface IRegisterFormFields {
  username: string;
  password: string;
  password2: string;
  email: string;
  first_name: string;
  last_name: string;
}

export type RegisterFormFieldNamesType = keyof IRegisterFormFields;

type RegisterFormFieldsType = {
  name: RegisterFormFieldNamesType;
  type: "text" | "password" | "email";
  label: string;
};

export const registerFormFieldsNamesArray = [
  "username",
  "password",
  "password2",
  "email",
  "first_name",
  "last_name",
] as const;

export const registerFormFields: RegisterFormFieldsType[] = [
  {
    name: "username",
    type: "text",
    label: "Username",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
  },
  {
    name: "password2",
    type: "password",
    label: "Confirm password",
  },
  {
    name: "email",
    type: "email",
    label: "E-mail",
  },
  {
    name: "first_name",
    type: "text",
    label: "First name",
  },
  {
    name: "last_name",
    type: "text",
    label: "Last name",
  },
];
