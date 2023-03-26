import axios, { AxiosError } from "axios";
import axiosInstance from "src/auth/axios-config";
import { Button, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth, useLoading, useUser } from "../../hooks";
import { Trans, useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import { useRef } from "react";

import {
  RegisterFormFieldNamesType,
  registerFormFieldsNamesArray,
} from "./register-form-fields";
import { generateYupSchema } from "./generate-registration-schema";
import { generateRegisterFormFields } from "./generate-registration-fields";
import { toast } from "react-toastify";
import { RegisterResponseError } from "src/types/axios.types";
import { axiosErrorHandler } from "src/auth/auth-service";
import { takeNapPlease } from "src/helpers/utils";
import { useKeyPressed } from "src/hooks/useKeyPressed";

export const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const { getAccessAndRefresh } = useAuth();
  const { setIsLoggedIn, setHasBeenChecked } = useUser();
  const initialValues = registerFormFieldsNamesArray.reduce((acc, currVal) => {
    return {
      ...acc,
      [currVal]: "",
    };
  }, {}) as { [key in RegisterFormFieldNamesType]: string };

  const { isLoading, setIsLoading } = useLoading();

  useKeyPressed("Enter", () => {
    submitButtonRef &&
      submitButtonRef.current &&
      submitButtonRef.current.click();
  });

  const registerFormFields = generateRegisterFormFields();
  const validationSchema = generateYupSchema(registerFormFields);

  return (
    <Box>
      <Box display="flex" mt="10px" justifyContent="space-between" width="100%">
        <Box width="100%">
          <Formik
            initialValues={initialValues}
            onSubmit={async (
              values,
              { setSubmitting, setFieldError, resetForm }
            ) => {
              setIsLoading(true);
              setSubmitting(true);
              try {
                const registerResponse = await axiosInstance.post(
                  "/register",
                  values,
                  { withCredentials: true }
                );

                if (registerResponse.status === 201) {
                  const successMessage = t("register-success-message");
                  toast.success(successMessage);

                  try {
                    await getAccessAndRefresh(values.username, values.password);

                    resetForm();
                    await takeNapPlease(1000);
                    setIsLoading(false);
                    setSubmitting(false);
                    setIsLoggedIn(true);
                    setHasBeenChecked(true);
                    navigate("/logged-in");
                  } catch (error) {
                    const handleAxiosError =
                      axiosErrorHandler<RegisterResponseError>((err) => {
                        toast.error(err.error.message);
                      });

                    if (axios.isAxiosError(error)) {
                      handleAxiosError(error as AxiosError);
                    }
                  }
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
                      gridTemplateColumns={["1fr", "1fr", "2fr 2fr"]}
                    >
                      {registerFormFields.map((field) => {
                        const { label, name, type } = field;
                        const hasError = Boolean(errors[name] && touched[name]);
                        return (
                          <TextField
                            key={name}
                            name={name}
                            type={type}
                            label={label}
                            autoFocus={name === "username"}
                            variant="outlined"
                            error={hasError}
                            value={values[name]}
                            disabled={isLoading}
                            onChange={handleChange}
                            helperText={
                              hasError && (
                                <Trans
                                  i18nKey={errors[name]}
                                  components={{
                                    strong: (
                                      <strong
                                        style={{ textDecoration: "underline" }}
                                      />
                                    ),
                                  }}
                                />
                              )
                            }
                          />
                        );
                      })}
                    </Box>

                    <Button
                      ref={submitButtonRef}
                      type="submit"
                      variant="contained"
                      disabled={isLoading}
                      sx={{
                        mt: ["10px", "10px", "20px"],
                      }}
                    >
                      {t("register")}
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
