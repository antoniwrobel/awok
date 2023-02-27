// External imports
import { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Box, Container } from "@mui/material";
import ReactDOM from "react-dom/client";

// Local imports
import App from "./app";
import initI18n from "./lang";
import styles from "../src/index.module.scss";
import Layout from "./components/Layout";
import AuthProvider from "./context/AuthProvider";
import ErrorBoundary from "./error-boundary";
import LoadingProvider from "./context/LoadingProvider";

import reportWebVitals from "./util/web-vitals";
import "./styles/main.scss";

// Global initialization
initI18n();

const htmlRoot = document.getElementById("root") as HTMLElement;
const reactRoot = ReactDOM.createRoot(htmlRoot);

const reportOn = false;

reactRoot.render(
  <StrictMode>
    <Box className={styles["main-wrapper"]}>
      <ErrorBoundary>
        <AuthProvider>
          <LoadingProvider>
            <Box className={styles["main-box"]}>
              <Router basename={process.env.PUBLIC_URL}>
                <Container className={styles["main-container"]}>
                  <Layout />
                </Container>
                <Container className={styles["main-container"]}>
                  <App />
                </Container>
              </Router>
            </Box>
          </LoadingProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Box>
  </StrictMode>
);

if (process.env.REACT_APP_ENV !== "production" && reportOn) {
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  // eslint-disable-next-line no-console
  reportWebVitals(console.log);
}
