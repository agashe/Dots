import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const appName = process.env.REACT_APP_NAME;

  return (
    <small style={{ padding: "10px 0", textAlign: "center" }}>
      {appName} &copy; {year}, {t('copyrights_text')}
    </small>
  );
}
