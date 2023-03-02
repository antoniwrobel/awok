import { ChangeEvent, useEffect, useState } from "react";
import { Typography, Button, TextField, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useLoading } from "../../hooks";
import { useTranslation } from "react-i18next";
import { toast, ToastContent } from "react-toastify";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const { signin, signIn, user } = useAuth();

  const { isLoading, setIsLoading } = useLoading();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // await signIn(username, password);
      signin(username, () => {
        setIsLoading(false);
        navigate(from, { replace: true });
      });
    } catch (err) {
      const error = err as ToastContent<unknown>;
      toast.error(error);
    }

    setIsLoading(false);
  };

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
        <Box display="flex" flexDirection="column" gap="10px">
          <TextField
            label="username"
            variant="outlined"
            disabled={isLoading}
            value={username}
            onChange={handleChangeUsername}
          />
          <TextField
            label="password"
            variant="outlined"
            disabled={isLoading}
            value={password}
            onChange={handleChangePassword}
          />
        </Box>

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
