// External imports
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocale } from "src/hooks/useLocale";
import { LocalesType } from "src/types/locale.types";

// Local imports
import { useUser } from "../../hooks";

type Language = {
  [key: string]: { nativeName: string };
};

const lngs: Language = {
  pl: { nativeName: "Polski" },
  en: { nativeName: "English" },
  es: { nativeName: "Español" },
};

const LocalePicker = () => {
  const { isLoggedIn } = useUser();
  const {
    i18n: { resolvedLanguage },
    t,
  } = useTranslation();
  const { changeLocale } = useLocale();

  return (
    <Box display="flex" justifyContent="space-between" mb={["10px", "20px"]}>
      {!isLoggedIn && (
        <Typography variant="h6" component="h6">
          {t("not-logged-in")}
        </Typography>
      )}
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

export default LocalePicker;
