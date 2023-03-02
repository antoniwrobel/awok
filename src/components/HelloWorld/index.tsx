/**
 * The HelloWorld component renders an alert with
 * the package name, version and environment.
 */

// External imports
import { Alert, AlertProps, Box, BoxProps, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

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
  const alertProps = { ...alert } as AlertProps;

  const name = process.env.REACT_APP_PACKAGE_NAME;
  const version = process.env.REACT_APP_PACKAGE_VERSION;
  const env = process.env.REACT_APP_ENV;

  return (
    <Box {...boxProps}>
      <Box
        display="grid"
        gridTemplateColumns={["1fr", "1fr 1fr 1fr"]}
        gap="10px"
      >
        {Object.keys(lngs).map((lng) => (
          <Button
            type="submit"
            variant="outlined"
            sx={{
              backgroundColor: "#fff",
            }}
            key={lng}
            onClick={() => i18n.changeLanguage(lng)}
            disabled={i18n.resolvedLanguage === lng}
          >
            {lngs[lng].nativeName}
          </Button>
        ))}
      </Box>
      <Box display="grid" gridTemplateColumns="1fr" mt="10px">
        <Box>{name}</Box>
        <Box>{version}</Box>
        <Box>{env}</Box>
      </Box>
    </Box>
  );
};

// Default props
HelloWorld.defaultProps = {
  box: {},
};

// Default export
export default HelloWorld;
