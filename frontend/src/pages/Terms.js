import { ContentLayout } from "../components/ContentLayout";
import { useTranslation } from "react-i18next";

export function Terms() {
  const { t } = useTranslation();

  let content = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.
    <br />
    <br />
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.
    <br />
    <br />
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.
    <br />
    <br />
    <br />

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.
    <br />
    <br />
    <br />
    <br />

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.
  `;

  return <ContentLayout title={t('terms')} content={content} />;
}
