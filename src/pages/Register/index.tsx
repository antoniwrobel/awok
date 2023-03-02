import { useEffect } from "react";
import { Button, TextField, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useLoading } from "../../hooks";
import { useTranslation } from "react-i18next";
import { Formik, Form, FormikValues } from "formik";
import {
  RegisterFormFieldNamesType,
  registerFormFieldsNamesArray,
} from "./register-form-fields";
import { generateYupSchema } from "./generate-registration-schema";
import { generateRegisterFormFields } from "./generate-registration-fields";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { user } = useAuth();

  const initialValues = registerFormFieldsNamesArray.reduce((acc, currVal) => {
    return {
      ...acc,
      [currVal]: "",
    };
  }, {}) as { [key in RegisterFormFieldNamesType]: string };

  const { isLoading, setIsLoading } = useLoading();

  const from = location.state?.from?.pathname || "/";
  const registerFormFields = generateRegisterFormFields();
  const validationSchema = generateYupSchema(registerFormFields);

  const handleSubmit = async (values: FormikValues) => {
    setIsLoading(true);

    console.log({ values });

    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);

  return (
    <Box>
      <Box display="flex" mt="10px" justifyContent="space-between" width="100%">
        <Box width="100%">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ values, handleChange, errors, touched }) => {
              console.log({ errors, touched });
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
                      gridTemplateColumns="2fr 2fr"
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
                      disabled={isLoading}
                      sx={{
                        maxWidth: "150px",
                        mt: "20px",
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
