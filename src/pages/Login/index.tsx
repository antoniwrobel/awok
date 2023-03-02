import { ChangeEvent, useEffect, useState } from "react";
import { Typography, Button, TextField, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useLoading } from "../../hooks";
import { useTranslation } from "react-i18next";
import { toast, ToastContent } from "react-toastify";
import { Form, Formik } from "formik";
import axios from "axios";
import { RegisterResponseError } from "src/types/axios.types";
import { registerFormFieldsNamesArray } from "../Register/register-form-fields";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const { signIn, user } = useAuth();

  const { isLoading, setIsLoading } = useLoading();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleChangeUsername = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setUsername(value);

  const handleChangePassword = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPassword(value);

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);

  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Typography variant="h6" component="h6">
        {t("login-to-view")} "{from}"
      </Typography>

      <Box display="flex" mt="10px" justifyContent="space-between">
        <Box width="100%">
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
              setIsLoading(true);
              setSubmitting(true);

              try {
                await signIn(values.username, values.password);
                toast.success("Poprawnie zalogowano");
                setIsLoading(false);
                setSubmitting(false);

                navigate("/logged-in");
              } catch (error) {
                setIsLoading(false);
                setSubmitting(false);
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
                  throw new Error("Other login user error");
                }
              }
            }}
          >
            {({ values, handleChange, errors, touched }) => {
              const hasErrorUsername = Boolean(
                errors.username && touched.username
              );
              const hasErrorPassword = Boolean(
                errors.password && touched.password
              );

              return (
                <Box>
                  <Form
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      alignItems: "flex-end",
                    }}
                  >
                    <Box
                      display="grid"
                      gap="10px"
                      width="100%"
                      gridTemplateColumns="1fr 1fr"
                    >
                      <TextField
                        label="Username"
                        name="username"
                        variant="outlined"
                        disabled={isLoading}
                        value={values.username}
                        onChange={handleChange}
                        error={hasErrorUsername}
                        helperText={hasErrorUsername && errors.username}
                      />
                      <TextField
                        label="Password"
                        name="password"
                        variant="outlined"
                        disabled={isLoading}
                        value={values.password}
                        onChange={handleChange}
                        error={hasErrorPassword}
                        helperText={hasErrorPassword && errors.password}
                      />
                    </Box>

                    <Button
                      sx={{ mt: "10px" }}
                      disabled={isLoading}
                      type="submit"
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
