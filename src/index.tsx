// import * as Sentry from "@sentry/react";
// import { BrowserTracing } from "@sentry/tracing";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";

import App from "./app";
import initI18n from "./routes/i18n";
import AuthProvider from "./context/AuthProvider";
import LoadingProvider from "./context/LoadingProvider";
import UserProvider from "./context/UserProvider";
import ErrorBoundary from "./error-boundary";
import LoadingModal from "./modals/Loading";
import ColorThemeProvider from "./context/ColorThemeProvider";
import { LocaleProviderWrapper } from "./context/LocaleProvider";
import { Navbar } from "./components/Navbar";
import PagesList from "./components/PagesList";
import { Wrapper } from "./components/Wrapper";
import { UserDetails } from "./components/UserDetails";
import { ThemeProviderWrapper } from "./components/ThemeProviderWrapper";
import Logo from "./assets/logo.png";

import "react-toastify/dist/ReactToastify.css";
import "./styles/main.scss";
import { PAGE_TITLE } from "./consts";

// Global initialization
initI18n();

// Sentry.init({
//   dsn: process.env.REACT_APP_SENTRY_DNS,
//   integrations: [new BrowserTracing()],
//   tracesSampleRate: 1.0,
//   tunnel: "/unblocksentry",
// });

const htmlRoot = document.getElementById("root") as HTMLElement;
const reactRoot = createRoot(htmlRoot);

reactRoot.render(
  <ColorThemeProvider>
    <Helmet>
      <title>{PAGE_TITLE + "Home"}</title>
      <meta name="description" content="AWOK | Your business manager" />
      <meta property="og:url" content="https://awok.fe" />
      <meta property="og:site_name" content="AWOK | Your business manager" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={Logo} />
    </Helmet>
    <ThemeProviderWrapper>
      <LoadingProvider>
        <LocaleProviderWrapper>
          <AuthProvider>
            <UserProvider>
              <Suspense fallback={<LoadingModal isOpen />}>
                <Wrapper>
                  <ToastContainer
                    draggable
                    closeOnClick
                    pauseOnHover
                    pauseOnFocusLoss
                    theme="light"
                    position="bottom-left"
                    autoClose={3000}
                  />

                  <ErrorBoundary>
                    <Router>
                      <Navbar />
                      <UserDetails />
                      <PagesList />
                      <App />
                    </Router>
                  </ErrorBoundary>
                </Wrapper>
              </Suspense>
            </UserProvider>
          </AuthProvider>
        </LocaleProviderWrapper>
      </LoadingProvider>
    </ThemeProviderWrapper>
  </ColorThemeProvider>
);
