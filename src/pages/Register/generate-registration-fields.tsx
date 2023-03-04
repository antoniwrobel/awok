import { useTranslation } from "react-i18next";
import { RegisterFormFieldsType } from "./register-form-fields";

export const generateRegisterFormFields = (): RegisterFormFieldsType[] => {
  const { t } = useTranslation();
  return [
    {
      name: "username",
      type: "text",
      label: t("username"),
      required: true,
      maxLength: 150,
    },
    {
      name: "email",
      type: "email",
      label: t("email"),
      required: true,
      maxLength: 150,
    },
    {
      name: "password",
      type: "password",
      label: t("pass"),
      required: true,
      maxLength: 150,
      notEditable: true,
    },
    {
      name: "password2",
      type: "password",
      label: t("pass-confirm"),
      required: true,
      maxLength: 150,
      notEditable: true,
    },

    {
      name: "first_name",
      type: "text",
      label: t("first-name"),
      required: true,
      maxLength: 150,
    },
    {
      name: "last_name",
      type: "text",
      label: t("last-name"),
      required: true,
      maxLength: 150,
    },
  ];
};
