// External imports
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";

// Local imports
import App from "./app";
import initI18n from "./lang";
import Layout from "./components/Layout";
import AuthProvider from "./context/AuthProvider";
import LoadingProvider from "./context/LoadingProvider";
import ErrorBoundary from "./error-boundary";
import styles from "./index.module.scss";
import { Navbar } from "./components/Navbar";

import reportWebVitals from "./util/web-vitals";

import "react-toastify/dist/ReactToastify.css";
import "./styles/main.scss";

// Global initialization
initI18n();

const htmlRoot = document.getElementById("root") as HTMLElement;
const reactRoot = createRoot(htmlRoot);
const reportOn = false;

const appVersion = process.env.REACT_APP_PACKAGE_VERSION;

console.log({ appVersion });

const theme = createTheme({
  typography: {
    fontFamily: "Fira Code",
  },
});

reactRoot.render(
  <ThemeProvider theme={theme}>
    <Box className={styles["main-wrapper"]}>
      <ToastContainer
        theme="colored"
        position="top-right"
        rtl={false}
        autoClose={5000}
        newestOnTop={false}
        hideProgressBar={false}
        draggable
        closeOnClick
        pauseOnHover
        pauseOnFocusLoss
      />
      <ErrorBoundary>
        <AuthProvider>
          <LoadingProvider>
            <Box className={styles["main-box"]}>
              <Router basename={process.env.PUBLIC_URL}>
                <Navbar />
                <Container
                  maxWidth={false}
                  className={styles["main-container"]}
                >
                  <Layout />
                </Container>
                <Container
                  maxWidth={false}
                  className={styles["main-container"]}
                >
                  <App />
                </Container>
              </Router>
            </Box>
          </LoadingProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Box>
  </ThemeProvider>
);

if (process.env.REACT_APP_ENV !== "production" && reportOn) {
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  // eslint-disable-next-line no-console
  reportWebVitals(console.log);
}
