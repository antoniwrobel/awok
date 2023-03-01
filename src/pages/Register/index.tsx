import { useEffect } from "react";
import { Button, TextField, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useLoading } from "../../hooks";
import { useTranslation } from "react-i18next";
import { toast, ToastContent } from "react-toastify";
import { Formik, Form, FormikValues } from "formik";
import {
  generateYupSchema,
  RegisterFormFieldNamesType,
  registerFormFields,
  registerFormFieldsNamesArray,
} from "./register-form-fields";

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

  const validationSchema = generateYupSchema(registerFormFields);

  const handleSubmit = async (values: FormikValues) => {
    setIsLoading(true);

    try {
      const success = await validationSchema.validate(values);
      console.log({ success, values });
    } catch (err) {
      const error = err as ToastContent<unknown>;
      toast.error(error);
    }

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
            {({ values, handleChange }) => {
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
                      gridTemplateColumns="2fr 2fr 2fr"
                      width="100%"
                    >
                      {registerFormFields.map((field) => {
                        const { label, name, type } = field;
                        return (
                          <TextField
                            key={name}
                            label={label}
                            name={name}
                            variant="outlined"
                            disabled={isLoading}
                            value={values[name]}
                            onChange={handleChange}
                            type={type}
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
