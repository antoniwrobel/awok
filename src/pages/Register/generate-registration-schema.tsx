import { useTranslation } from "react-i18next";
import { object, ref, string, StringSchema } from "yup";
import { RegisterFormFieldsType } from "./register-form-fields";

export const generateYupSchema = (
  fields: RegisterFormFieldsType[],
  isEditSchema?: boolean
) => {
  const { t } = useTranslation();

  const schema: Record<string, StringSchema> = {};

  fields.forEach((field) => {
    if (isEditSchema && field.notEditable) {
      return;
    }

    const formattedLabel = field.label.toLowerCase();

    let fieldSchema = string().trim();

    if (field.name === "username") {
      fieldSchema = fieldSchema.matches(/^[a-zA-Z0-9@/./+/-/_]+$/, {
        message: t("only-letters"),
        excludeEmptyString: true,
      });
    }

    if (field.minLength) {
      fieldSchema = fieldSchema.min(
        field.minLength,
        t("min-length", {
          label: formattedLabel,
          length: field.minLength,
        })
      );
    }

    if (field.maxLength) {
      fieldSchema = fieldSchema.max(
        field.maxLength,
        t("max-length", {
          label: formattedLabel,
          length: field.minLength,
        })
      );
    }

    if (field.type === "email") {
      fieldSchema = fieldSchema.email(t("invalid-email"));
    }

    if (field.type === "password") {
      fieldSchema = fieldSchema
        .min(8, t("min-length", { label: formattedLabel, length: 8 }))
        .matches(/[a-z]/, t("pass-one-lowercase"))
        .matches(/[A-Z]/, t("pass-one-uppercase"))
        .matches(/\d/, t("pass-one-digit"));
    }

    if (field.name === "password2") {
      fieldSchema = fieldSchema
        .oneOf([ref("password")], t("pass-match"))
        .required(t("pass-confirm"));
    }

    if (field.required) {
      fieldSchema = fieldSchema.required(
        t("required", { label: formattedLabel })
      );
    }

    schema[field.name] = fieldSchema;
  });

  return object(schema);
};
