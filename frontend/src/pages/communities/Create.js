import {
  Flex,
  Box,
  HStack,
  Card,
  CardBody,
  Heading,
  CardHeader,
  Spacer,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Image,
  IconButton,
  Icon,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import { Footer } from "../../components/Footer";
import { MdRemoveCircle } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";

export function Create() {
  const { t } = useTranslation();

  return (
    <>
      <SEO info={{ title: t('actions.create_community') }} />
      <Flex pt={5} px={10} bg='gray.50' minHeight='90vh' flexDirection='column'>
        <Card
          w='70%'
          mx='auto'
          mb={5}
          justifyContent='center'
          alignItems='center'
          textAlign='center'
        >
          <CardHeader>
            <Heading textAlign='center'>{t('create_community')}</Heading>
          </CardHeader>
        </Card>

        <Card w='70%' mx='auto' mb={5}>
          <CardBody>
            <FormControl>
              <FormLabel>{t('community.name')}</FormLabel>
              <Input type='text' placeholder={t('placeholders.community_name')} />
            </FormControl>

            <FormControl my={5}>
              <FormLabel>{t('community.logo')}</FormLabel>
              <HStack spacing={2}>
                <Box boxSize={12} mr={3}>
                  <Image
                    src='images/group-placeholder.png'
                    fallbackSrc='images/group-placeholder.png'
                  />
                </Box>
                <Box mr={3} w='full'>
                  <Input type='file' pt={1} />
                </Box>
                <Box>
                  <Tooltip label={t('actions.remove')}>
                    <IconButton
                      colorScheme='brand'
                      icon={<Icon as={MdRemoveCircle} boxSize={6} />}
                    />
                  </Tooltip>
                </Box>
              </HStack>
            </FormControl>

            <FormControl my={5}>
              <FormLabel>{t('community.description')}</FormLabel>
              <Textarea
                placeholder={t('placeholders.community_description')}
                resize='none'
              />
            </FormControl>
          </CardBody>
        </Card>

        <Card
          w='70%'
          mx='auto'
          mb={5}
          justifyContent='center'
          alignItems='center'
          textAlign='center'
        >
          <CardHeader w='100%'>
            <Button w='100%'>{t('actions.create')}</Button>
          </CardHeader>
        </Card>

        <Spacer />

        <Footer />
      </Flex>
    </>
  );
}
