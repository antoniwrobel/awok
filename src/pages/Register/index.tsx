import { useEffect } from "react";
import { Button, TextField, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useLoading } from "../../hooks";
import { useTranslation } from "react-i18next";
import { toast, ToastContent } from "react-toastify";
import { Formik } from "formik";
import {
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

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
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
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      alignItems="flex-end"
    >
      <Box display="flex" mt="10px" justifyContent="space-between" width="100%">
        <Box
          display="grid"
          flexDirection="column"
          gap="10px"
          gridTemplateColumns="2fr 2fr 2fr"
          width="100%"
        >
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, handleChange }) => {
              return registerFormFields.map((field) => {
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
              });
            }}
          </Formik>
        </Box>
      </Box>

      <Button
        disabled={isLoading}
        onClick={handleSubmit}
        type="button"
        sx={{
          maxWidth: "150px",
          mt: "20px",
        }}
      >
        {t("register")}
      </Button>
    </Box>
  );
};
