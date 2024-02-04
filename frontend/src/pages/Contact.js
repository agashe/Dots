import { ContentLayout } from "../components/ContentLayout";
import { useTranslation } from "react-i18next";

export function Contact() {
  const { t } = useTranslation();

  let content = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.
    <br />
    <br />
  `;

  return <ContentLayout title={t('contact')} content={content} />;
}
