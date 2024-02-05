import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export function SEO({ info }) {
  const { t } = useTranslation();
  const appName = process.env.REACT_APP_NAME;
  const title = !info.title ? `${appName}` : `${info.title} - ${appName}`;
  const description = info.description ?? t('seo.description');
  const keywords = info.keywords ?? t('seo.keywords');
  
  return (
    <Helmet>
      <title>{title}</title>

      <link rel="canonical" href={window.location.href} />

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={info.siteName ?? appName} />
      <meta property="og:url" content={window.location.href} />
      {info.image && <meta property="og:image" content={info.image} />}

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {info.image && <meta property="twitter:image:src" content={info.image} />}
    </Helmet>
  );
}
