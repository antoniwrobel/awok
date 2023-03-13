import axios, { AxiosError } from "axios";
import { useTranslation, Trans } from "react-i18next";
import { Form, Formik } from "formik";
import { Typography, Button, TextField, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth, useLoading, useUser } from "../../hooks";
import { RegisterResponseError } from "src/types/axios.types";
import { axiosErrorHandler } from "src/auth/auth-service";
import { generateYupSchema } from "../Register/generate-registration-schema";
import { generateLoginFormFields } from "./generate-login-fields";
import { registerFormFieldsNamesArray } from "../Register/register-form-fields";
import { handleCombineErrors, handleNonFieldErrors } from "src/helpers/errors";
import { takeNapPlease } from "src/helpers/utils";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useTranslation();
  const { setHasBeenChecked, setIsLoggedIn } = useUser();
  const { getAccessAndRefresh } = useAuth();
  const { isLoading, setIsLoading } = useLoading();

  const loginFormFields = generateLoginFormFields();
  const validationSchema = generateYupSchema(loginFormFields);

  const from = location.state?.from?.pathname || "/";

  return (
    <Box display="flex" flexDirection="column" width="100%">
      {from !== "/" && (
        <Typography variant="h6" component="h6">
          {t("login-to-view")} "{from}"
        </Typography>
      )}

      <Box display="flex" mt="10px" justifyContent="space-between">
        <Box width="100%">
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (
              values,
              { setSubmitting, setFieldError, resetForm }
            ) => {
              setIsLoading(true);
              setSubmitting(true);

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
                    if (err.type === "axios-error") {
                      for (const fieldName of registerFormFieldsNamesArray) {
                        const errors = err.error.response?.data[fieldName];
                        const errorMessage = handleCombineErrors(errors);

                        if (errors) {
                          setFieldError(fieldName, errorMessage);
                          return;
                        }
                      }

                      handleNonFieldErrors(err.error);

                      resetForm({
                        values: {
                          username: values.username,
                          password: "",
                        },
                      });
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
          >
            {({ values, handleChange, errors, touched }) => {
              return (
                <Box>
                  <Form
                    style={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <Box
                      gap="10px"
                      width="100%"
                      display="grid"
                      gridTemplateColumns={["1fr", "1fr", "1fr 1fr"]}
                    >
                      {loginFormFields.map((field) => {
                        const { label, name, type } = field;
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
                            inputProps={{
                              form: {
                                autocomplete: "off",
                              },
                            }}
                          />
                        );
                      })}
                    </Box>

                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      sx={{ mt: "10px" }}
                      disabled={isLoading}
                    >
                      {t("login")}
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
