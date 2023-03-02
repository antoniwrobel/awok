// External imports
import { AlertProps, Box, BoxProps, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
interface HelloWorldProps {
  alert?: AlertProps;
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

const HelloWorld = ({ alert, box }: HelloWorldProps) => {
  const { i18n } = useTranslation();

  const defaults = HelloWorld.defaultProps;
  const boxProps = { ...defaults.box, ...box } as BoxProps;

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

HelloWorld.defaultProps = {
  box: {},
};

export default HelloWorld;
