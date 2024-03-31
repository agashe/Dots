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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Footer } from "../../components/Footer";
import { Confirm } from "../../components/Confirm";
import { MdRemoveCircle } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

export function Edit() {
  const [idInput, setIdInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [logoInput, setLogoInput] = useState('');
  const { t } = useTranslation();
  const { name } = useParams();
  const toast = useToast();

  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();

  useEffect(function () {
    window.scrollTo(0, 0);

    axios.post('/posts/list', {
      entity: 'community',
      entity_id: name.replaceAll('+', ' '),
      page: 1
    })
      .then(function (response) {
        setIdInput(response.data.data.entity.id);
        setNameInput(response.data.data.entity.name);
        setDescriptionInput(response.data.data.entity.description);
        setLogoInput(response.data.data.entity.logo);
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

  function submit(event) {
    event.preventDefault();

    axios.put("/communities", {
      community_id: idInput,
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

  function handleFileInput(event) {
    event.preventDefault();

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function () {
      axios.post("/asset-files/upload", {
        entity: 'community',
        entity_id: idInput,
        type: 'logo',
        meta: {
          name: file.name.replace(/\.[^/.]+$/, ''),
          size: file.size,
          mime: file.type
        },
        file: reader.result.replace(/data:(.*?)\/(.*?);base64,/, '')
      })
        .then(function (response) {
          setLogoInput(response.data.data.path);
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
    };

    reader.onerror = function (error) {
      toast({
        title: error,
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
    };
  }

  function removeLogo(event) {
    event.preventDefault();

    axios.delete("/asset-files/delete", {
      entity: 'community',
      entity_id: idInput,
      type: 'logo',
    })
      .then(function (response) {
        document.getElementById('logo-input').value = '';
        setLogoInput(null);
        onCloseConfirm();
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
      <SEO info={{ title: t('actions.edit_community') }} />
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
            <Heading textAlign='center' size='lg'>{t('actions.edit_community')}</Heading>
          </CardHeader>
        </Card>

        <Card w={{ base: '100%', lg: '70%' }} mx='auto' mb={5}>
          <CardBody>
            <FormControl>
              <FormLabel>{t('community.name')}</FormLabel>
              <Input
                type='text'
                placeholder={t('placeholders.community_name')}
                value={nameInput}
                onChange={(e) => { setNameInput(e.target.value) }}
              />
            </FormControl>

            <FormControl my={5}>
              <FormLabel>{t('community.logo')}</FormLabel>
              <HStack spacing={2}>
                <Box boxSize={12} mr={3}>
                  <Image
                    src={logoInput}
                    fallbackSrc='/images/group-placeholder.png'
                  />
                </Box>
                <Box mr={3} w='full'>
                  <Input type='file' id="logo-input" pt={1} onChange={handleFileInput} accept=".jpeg, .jpg, .png" />
                </Box>
                <Box>
                  <Tooltip label={t('actions.remove')}>
                    <IconButton
                      colorScheme='brand'
                      icon={<Icon as={MdRemoveCircle} boxSize={6} />}
                      onClick={(e) => {
                        if (!logoInput) {
                          return;
                        }

                        onOpenConfirm();
                      }}
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
                value={descriptionInput}
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
            <Button w='100%' onClick={submit}>{t('actions.update')}</Button>
          </CardHeader>
        </Card>

        <Spacer />

        <Footer />
      </Flex>

      <Confirm
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        title={t('actions.remove')}
        label={t('actions.remove')}
        handler={removeLogo}
      />
    </>
  );
}
