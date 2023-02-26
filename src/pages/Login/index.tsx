import { useEffect } from "react";
import { Typography, Button, TextField, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;

    auth.signin(username, () => {
      navigate(from, { replace: true });
    });
  };

  useEffect(() => {
    if (auth && auth.user) {
      navigate(from, { replace: true });
    }
  }, [auth]);

  return (
    <>
      <Typography variant="h6" component="h6">
        You must log in to view the page at "{from}"
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box display="flex" mt="10px">
          <TextField
            id="username"
            label="e-mail"
            name="username"
            variant="outlined"
          />

          <Button type="submit" sx={{ marginLeft: "20px" }}>
            Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default LoginPage;
