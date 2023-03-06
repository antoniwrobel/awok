import axios, { AxiosError } from "axios";
import { Typography, Button, TextField, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useLoading, useUser } from "../../hooks";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import { RegisterResponseError } from "src/types/axios.types";
import { registerFormFieldsNamesArray } from "../Register/register-form-fields";
import { handleCombineErrors, handleNonFieldErrors } from "src/helpers/errors";
import { generateYupSchema } from "../Register/generate-registration-schema";
import { generateLoginFormFields } from "./generate-login-fields";
import { axiosErrorHandler } from "src/auth/auth-service";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useTranslation();
  const { signIn } = useAuth();
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
                await signIn(values.username, values.password);
                navigate("/logged-in");

                window.location.reload();
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
                    } else {
                      console.error("Stock error occurred:", error);
                      toast.error(err.error.message);
                      resetForm();
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
                      display="grid"
                      gap="10px"
                      width="100%"
                      gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr"]}
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
                            helperText={hasError && errors[name]}
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
                      disabled={isLoading}
                      sx={{ mt: "10px" }}
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
