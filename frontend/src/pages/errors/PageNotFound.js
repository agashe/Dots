import { Flex, Card, Heading, Text, Spacer, Icon } from "@chakra-ui/react";
import { MdQuestionMark } from "react-icons/md";
import { Footer } from "../../components/Footer";
import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";

export function PageNotFound() {
  const { t } = useTranslation();

  return (
    <>
      <SEO info={{ title: t('errors.page_not_found') }} />
      <Flex pt={5} px={{ base: 5, lg: 10 }}  minHeight='100vh' flexDirection='column'>
        <Card
          boxSize='lg'
          mx='auto'
          mb={5}
          textAlign='center'
          w={{base: '100%', lg: '40%'}}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon as={MdQuestionMark} boxSize={48} color='brand.main' />

          <Heading>{t('errors.page_not_found')}</Heading>

          <Text mt={5}>
            {t('errors.page_not_found_message')}
          </Text>
        </Card>

        <Spacer />

        <Footer />
      </Flex>
    </>
  );
}
