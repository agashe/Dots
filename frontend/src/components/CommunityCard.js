import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  Image,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export function CommunityCard() {
  const { t } = useTranslation();

  return (
    <Card mr={5} mb={5}>
      <CardBody>
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
          <Image
            boxSize={10}
            src='unknown.png'
            fallbackSrc='/images/group-placeholder.png'
            alt='Community logo'
          />

          <Box>
            <Heading size='sm'>The Unknown</Heading>
            <Text fontSize='xs'>2 {t('members')} </Text>
          </Box>
          <Box>
            <Text fontSize='sm'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              et neque lectus. Suspendisse venenatis imperdiet lobortis. Duis
              euismod neque ac convallis molestie
            </Text>
          </Box>

          <Box w='100%'>
            <Button w='100%'>{t('actions.join')}</Button>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
}
