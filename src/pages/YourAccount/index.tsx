import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { EditUser } from "src/components/EditUser";

export const YourAccount = () => {
  return (
    <Box>
      <Typography>Twoje konto</Typography>
      <EditUser />
    </Box>
  );
};
