import Box from "@mui/material/Box";
import { Helmet } from "react-helmet";

import { EditUser } from "src/components/EditUser";
import { PAGE_TITLE } from "src/consts";

export const YourAccount = () => {
  return (
    <Box>
      <Helmet>
        <title>{PAGE_TITLE + "Your account"}</title>
      </Helmet>
      <EditUser />
    </Box>
  );
};
