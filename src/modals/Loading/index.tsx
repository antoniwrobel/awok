// External imports
import { Backdrop, Box, CircularProgress } from "@mui/material";

// Local imports
import styles from "./index.module.scss";

type LoadingModalProps = {
  isOpen: boolean;
};

const LoadingModal = (props: LoadingModalProps) => {
  const { isOpen } = props;

  return isOpen ? (
    <Box className={styles["modal-wrapper"]}>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          position: "absolute",
          top: "0",
          left: "0",
          backgroundColor: "#000000",
          width: "100%",
          opacity: 0.3,
          zIndex: (theme) => theme.zIndex.drawer,
        }}
      />
      <Backdrop
        open
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: "250px",
          height: "250px",
          margin: "auto",
          borderRadius: "4px",
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  ) : null;
};

export default LoadingModal;
