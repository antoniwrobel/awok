import {
  object,
  string,
  number,
  date,
  InferType,
  StringSchema,
  ref,
} from "yup";

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
  required?: boolean;
  minLength?: number;
  maxLength?: number;
};

export const registerFormFieldsNamesArray = [
  "username",
  "password",
  "password2",
  "email",
  "first_name",
  "last_name",
] as const;

export const generateYupSchema = (fields: RegisterFormFieldsType[]) => {
  let schema: Record<string, StringSchema> = {};

  fields.forEach((field) => {
    const fieldSchema = string();

    if (field.required) {
      fieldSchema.required(`${field.label} is required`);
    }

    if (field.minLength) {
      fieldSchema.min(
        field.minLength,
        `${field.label} must be at least ${field.minLength} characters`
      );
    }

    if (field.maxLength) {
      fieldSchema.max(
        field.maxLength,
        `${field.label} must be at most ${field.maxLength} characters`
      );
    }

    if (field.type === "email") {
      fieldSchema.email("Invalid email address");
    }

    if (field.type === "password") {
      fieldSchema
        .min(8, "Password must be at least 8 characters long")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one digit");
    }

    if (field.name === "password2") {
      fieldSchema
        .oneOf([ref("password")], "Passwords do not match")
        .required("Please confirm your password");
    }
    schema[field.label] = fieldSchema;
  });

  return object(schema);
};

export const registerFormFields: RegisterFormFieldsType[] = [
  {
    name: "username",
    type: "text",
    label: "Username",
    required: true,
    minLength: 3,
    maxLength: 15,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    required: true,
  },
  {
    name: "password2",
    type: "password",
    label: "Confirm password",
    required: true,
  },
  {
    name: "email",
    type: "email",
    label: "E-mail",
    required: true,
    maxLength: 20,
  },
  {
    name: "first_name",
    type: "text",
    label: "First name",
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  {
    name: "last_name",
    type: "text",
    label: "Last name",
    required: true,
    maxLength: 20,
  },
];
