// External imports
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocale } from "src/hooks/useLocale";
import { LocalesType } from "src/types/locale.types";
import AuthStatus from "../AuthStatus";

type Language = {
  [key: string]: { nativeName: string };
};

const lngs: Language = {
  pl: { nativeName: "Polski" },
  en: { nativeName: "English" },
  es: { nativeName: "Español" },
};

const HelloWorld = () => {
  const {
    i18n: { resolvedLanguage },
  } = useTranslation();
  const { changeLocale } = useLocale();

  return (
    <Box>
      <AuthStatus />
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
            onClick={() => {
              const lang = lng as LocalesType;
              changeLocale(lang);
            }}
            disabled={resolvedLanguage === lng}
          >
            {lngs[lng].nativeName}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

HelloWorld.defaultProps = {
  box: {},
};

export default HelloWorld;
