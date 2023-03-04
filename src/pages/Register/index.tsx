import axios from "axios";
import axiosInstance from "src/auth/axios-config";
import { Button, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../hooks";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import {
  RegisterFormFieldNamesType,
  registerFormFieldsNamesArray,
} from "./register-form-fields";
import { generateYupSchema } from "./generate-registration-schema";
import { generateRegisterFormFields } from "./generate-registration-fields";
import { toast } from "react-toastify";
import { RegisterResponseError } from "src/types/axios.types";
import { setAccessToken } from "src/auth/auth-service";

export const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const initialValues = registerFormFieldsNamesArray.reduce((acc, currVal) => {
    return {
      ...acc,
      [currVal]: "",
    };
  }, {}) as { [key in RegisterFormFieldNamesType]: string };

  const { isLoading, setIsLoading } = useLoading();

  const registerFormFields = generateRegisterFormFields();
  const validationSchema = generateYupSchema(registerFormFields);

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
                const registerResponse = await axiosInstance.post(
                  "/register",
                  values
                );

                if (registerResponse.status === 201) {
                  const successMessage = t("register-success-message");

                  toast.success(successMessage);

                  try {
                    const apiTokenAuthResponse = await axiosInstance.post(
                      "/api-token-auth",
                      { username: values.username, password: values.password }
                    );

                    if (apiTokenAuthResponse.status === 200) {
                      setAccessToken(apiTokenAuthResponse.data.token);
                      navigate("/logged-in");
                    }
                  } catch (error) {
                    console.error(error);
                  }
                }
              } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                  for (const fieldName of registerFormFieldsNamesArray) {
                    const err = error as RegisterResponseError;
                    const errors = err.response.data[fieldName];
                    const errorMessage =
                      typeof errors === "object" ? errors.join(", ") : errors;

                    if (errors) {
                      setFieldError(fieldName, errorMessage);
                    }
                  }
                } else {
                  console.error(error);
                  throw new Error("Other register user error");
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
                      display="grid"
                      flexDirection="column"
                      gap="10px"
                      gridTemplateColumns={["1fr", "1fr", "2fr 2fr"]}
                      width="100%"
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
                            variant="outlined"
                            error={hasError}
                            value={values[name]}
                            disabled={isLoading}
                            onChange={handleChange}
                            helperText={hasError && errors[name]}
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
