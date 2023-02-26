/**
 * The HelloWorld component renders an alert with
 * the package name, version and environment.
 */

// External imports
import { Alert, AlertProps, Box, BoxProps } from "@mui/material";
import { useTranslation } from "react-i18next";

// Local imports
import styles from "./index.module.scss";

// Component props
interface HelloWorldProps {
  alert?: AlertProps;
  /**
   * The box container styles.
   * See: https://mui.com/material-ui/api/box
   */
  box?: BoxProps;
}

type Language = {
  [key: string]: { nativeName: string };
};

const lngs: Language = {
  pl: { nativeName: "Polski" },
  en: { nativeName: "English" },
  es: { nativeName: "Español" },
};

// Component definition
const HelloWorld = ({ alert, box }: HelloWorldProps) => {
  const { i18n } = useTranslation();

  const defaults = HelloWorld.defaultProps;
  const boxProps = { ...defaults.box, ...box } as BoxProps;
  const alertProps = { ...defaults.alert, ...alert } as AlertProps;

  const name = process.env.REACT_APP_PACKAGE_NAME;
  const version = process.env.REACT_APP_PACKAGE_VERSION;
  const env = process.env.REACT_APP_ENV;

  return (
    <Box {...boxProps}>
      <Alert {...alertProps}>
        <div>
          {Object.keys(lngs).map((lng) => (
            <button
              type="submit"
              key={lng}
              onClick={() => i18n.changeLanguage(lng)}
              disabled={i18n.resolvedLanguage === lng}
              className={styles["lng-button"]}
            >
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>

        <div className={styles.info}>{name}</div>
        <div className={styles.info}>{version}</div>
        <div className={styles.info}>{env}</div>
      </Alert>
    </Box>
  );
};

// Default props
HelloWorld.defaultProps = {
  alert: {
    severity: "success",
    sx: { width: 300 },
    variant: "filled",
  },
  box: {},
};

// Default export
export default HelloWorld;
