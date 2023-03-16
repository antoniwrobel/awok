import { useTranslation } from "react-i18next";

import { LoginFormFieldsType } from "./login-form-fields";

export const generateLoginFormFields = (): LoginFormFieldsType[] => {
  const { t } = useTranslation();
  return [
    {
      name: "username",
      type: "text",
      label: `${t("email")}/${t("username")}`,
      required: true,
      maxLength: 150,
    },
    {
      name: "password",
      type: "password",
      label: t("pass"),
      required: true,
      maxLength: 150,
    },
  ];
};
