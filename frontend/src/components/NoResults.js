import { Card, Heading, Text, Icon } from "@chakra-ui/react";
import { MdErrorOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";

export function NoResults({ message }) {
  const { t } = useTranslation();

  return (
    <Card
      boxSize={{ base: 'xs', md: 'md', lg: 'lg' }}
      mx='auto'
      mb={5}
      textAlign='center'
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon as={MdErrorOutline} boxSize={{ base: 24, lg: 48 }} color='brand.main' />

      <Heading>{t('errors.no_results')}</Heading>

      <Text mt={5}>{message}</Text>
    </Card>
  );
}
