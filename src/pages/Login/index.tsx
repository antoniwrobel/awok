import { ChangeEvent, useEffect, useState } from "react";
import { Typography, Button, TextField, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useLoading } from "../../hooks";
import { useTranslation } from "react-i18next";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { signin, user } = useAuth();
  const { isLoading, setIsLoading } = useLoading();
  const [username, setUsername] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async () => {
    setIsLoading(true);

    signin(username, () => {
      setIsLoading(false);
      navigate(from, { replace: true });
    });
  };

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setUsername(value);

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
        <TextField
          label="e-mail"
          variant="outlined"
          disabled={isLoading}
          value={username}
          onChange={handleChange}
        />

        <Button
          sx={{ marginLeft: "20px" }}
          disabled={isLoading}
          onClick={handleSubmit}
          type="button"
        >
          {t("login")}
        </Button>
      </Box>
    </Box>
  );
};
