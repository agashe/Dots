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
  useToast,
} from "@chakra-ui/react";
import { Footer } from "../../components/Footer";
import { MdRemoveCircle } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";
import { useState } from "react";
import axios from 'axios';

export function Create() {
  const [nameInput, setNameInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const { t } = useTranslation();
  const toast = useToast();

  function submit(event) {
    event.preventDefault();

    axios.post(process.env.REACT_APP_BACKEND_URL + "/communities", {
      name: nameInput,
      description: descriptionInput,
    })
      .then(function (response) {
        window.location.href = "/c/" + response.data.data.name.replaceAll(' ', '+');
      })
      .catch(function (error) {
        toast({
          title: error.response.data.message,
          status: 'error',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
      });
  }

  return (
    <>
      <SEO info={{ title: t('actions.create_community') }} />
      <Flex pt={5} px={{ base: 3, lg: 10 }} minHeight='100vh' flexDirection='column'>
        <Card
          w={{ base: '100%', lg: '70%' }}
          mx='auto'
          mb={5}
          justifyContent='center'
          alignItems='center'
          textAlign='center'
        >
          <CardHeader>
            <Heading textAlign='center' size='lg'>{t('actions.create_community')}</Heading>
          </CardHeader>
        </Card>

        <Card w={{ base: '100%', lg: '70%' }} mx='auto' mb={5}>
          <CardBody>
            <FormControl>
              <FormLabel>{t('community.name')}</FormLabel>
              <Input type='text' value={nameInput} placeholder={t('placeholders.community_name')} onChange={(e) => { setNameInput(e.target.value) }} />
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
                value={descriptionInput}
                placeholder={t('placeholders.community_description')}
                resize='none'
                onChange={(e) => { setDescriptionInput(e.target.value) }}
              />
            </FormControl>
          </CardBody>
        </Card>

        <Card
          w={{ base: '100%', lg: '70%' }}
          mx='auto'
          mb={5}
          justifyContent='center'
          alignItems='center'
          textAlign='center'
        >
          <CardHeader w='100%'>
            <Button w='100%' onClick={submit}>{t('actions.create')}</Button>
          </CardHeader>
        </Card>

        <Spacer />

        <Footer />
      </Flex>
    </>
  );
}
