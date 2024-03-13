import { useState, useEffect } from "react";
import { ContentLayout } from "../components/ContentLayout";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { useToast } from "@chakra-ui/react";

export function FAQ() {
  const { t } = useTranslation();
  const [content, setContent] = useState({});
  const toast = useToast();

  useEffect(function () {
    axios.get("/pages/faq")
      .then(function (response) {
        setContent(response.data.data);
      })
      .catch(function (error) {
        toast({
          title: t('errors.server_error'),
          status: 'error',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
      });
  }, []);

  return <ContentLayout title={content.title ?? ''} content={content.text ?? ''} />;
}
