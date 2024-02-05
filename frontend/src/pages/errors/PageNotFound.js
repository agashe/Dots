import { Flex, Card, Heading, Text, Spacer, Icon } from "@chakra-ui/react";
import { MdQuestionMark } from "react-icons/md";
import { Footer } from "../../components/Footer";
import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";

export function PageNotFound() {
  const { t } = useTranslation();

  return (
    <>
      <SEO info={{ title: t('page_not_found') }} />
      <Flex pt={5} px={10} bg='gray.50' minHeight='90vh' flexDirection='column'>
        <Card
          boxSize='lg'
          mx='auto'
          mb={5}
          textAlign='center'
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon as={MdQuestionMark} boxSize={48} color='brand.main' />

          <Heading>{t('page_not_found')}</Heading>

          <Text mt={5}>
            {t('page_not_found_message')}
          </Text>
        </Card>

        <Spacer />

        <Footer />
      </Flex>
    </>
  );
}
