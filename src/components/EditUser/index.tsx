import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios, { AxiosError } from "axios";
import { TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { Trans, useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import axiosInstance from "src/auth/axios-config";
import { useLoading, useUser } from "src/hooks";
import { axiosErrorHandler } from "src/auth/auth-service";
import { generateRegisterFormFields } from "src/pages/Register/generate-registration-fields";
import { generateYupSchema } from "src/pages/Register/generate-registration-schema";
import { RegisterResponseError } from "src/types/axios.types";
import {
  editableRegisterFormFieldsNamesArray,
  RegisterFormFieldNamesType,
  registerFormFieldsNamesArray,
} from "src/pages/Register/register-form-fields";

export const EditUser = () => {
  const { t } = useTranslation();
  const { isLoading, setIsLoading } = useLoading();
  const { user } = useUser();

  const registerFormFields = generateRegisterFormFields();
  const validationSchema = generateYupSchema(registerFormFields, true);

  if (!user) {
    return null;
  }

  const initialValues = editableRegisterFormFieldsNamesArray.reduce(
    (acc, currVal) => {
      return {
        ...acc,
        [currVal]: user[currVal],
      };
    },
    {}
  ) as { [key in RegisterFormFieldNamesType]: string };

  return (
    <Box>
      <Box display="flex" mt="10px" justifyContent="space-between" width="100%">
        <Box width="100%">
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
              setIsLoading(true);
              setSubmitting(true);
              try {
                const editUserResponse = await axiosInstance.patch(
                  "/user-update",
                  values
                );
                if (editUserResponse.status === 200) {
                  const successMessage = t("edit-success-message");
                  toast.success(successMessage);
                }
              } catch (error) {
                const handleAxiosError =
                  axiosErrorHandler<RegisterResponseError>((err) => {
                    if (err.type === "axios-error") {
                      for (const fieldName of registerFormFieldsNamesArray) {
                        const errors = err.error.response?.data[fieldName];
                        const errorMessage =
                          typeof errors === "object"
                            ? errors.join(", ")
                            : errors;

                        if (errors) {
                          setFieldError(fieldName, errorMessage);
                        }
                      }
                    }
                  });

                if (axios.isAxiosError(error)) {
                  handleAxiosError(error as AxiosError);
                }
              } finally {
                setIsLoading(false);
                setSubmitting(false);
              }
            }}
            validationSchema={validationSchema}
          >
            {({ values, handleChange, errors, touched }) => {
              return (
                <Box>
                  <Form
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <Box
                      gap="10px"
                      width="100%"
                      display="grid"
                      flexDirection="column"
                      gridTemplateColumns={["1fr", "1fr", "1fr 1fr"]}
                    >
                      {registerFormFields.map((field) => {
                        const { label, name, type, notEditable } = field;

                        if (notEditable) {
                          return;
                        }
                        const hasError = Boolean(errors[name] && touched[name]);
                        return (
                          <TextField
                            key={name}
                            name={name}
                            type={type}
                            label={label}
                            variant="outlined"
                            error={hasError}
                            value={values[name]}
                            disabled={isLoading}
                            onChange={handleChange}
                            helperText={
                              hasError && <Trans i18nKey={errors[name]} />
                            }
                          />
                        );
                      })}
                    </Box>

                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isLoading}
                      sx={{
                        mt: ["10px", "10px", "20px"],
                      }}
                    >
                      {t("save")}
                    </Button>
                  </Form>
                </Box>
              );
            }}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};
