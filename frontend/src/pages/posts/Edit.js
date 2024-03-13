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
  IconButton,
  Icon,
  Tooltip,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Badge,
  Image,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Footer } from "../../components/Footer";
import { Confirm } from "../../components/Confirm";
import { MdRemoveCircle } from "react-icons/md";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { Editor } from "../../components/Editor";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { SEO } from "../../components/SEO";
import axios from 'axios';

export function Edit() {
  const selectMenuBg = useColorModeValue('gray.50', 'gray.700');
  const selectMenuFontColor = useColorModeValue('black', '#b9c1cb');
  const [idInput, setIdInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [bannerInput, setBannerInput] = useState('');
  const [tagsList, setTagsList] = useState([]);
  const { t } = useTranslation();
  const { id } = useParams();
  const toast = useToast();

  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();

  useEffect(function () {
    axios.post(process.env.REACT_APP_BACKEND_URL + '/posts/show', {
      post_id: id,
      page: 1
    })
      .then(function (response) {
        setIdInput(response.data.data.post.id);
        setTitleInput(response.data.data.post.title);
        setTagsInput(response.data.data.post.tags);
        setTextInput(response.data.data.post.text);
        setBannerInput(response.data.data.post.banner);
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

    axios.get(process.env.REACT_APP_BACKEND_URL + "/posts/tags")
      .then(function (response) {
        setTagsList(response.data.data);
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
  }, []);

  function submit(event) {
    event.preventDefault();

    axios.put(process.env.REACT_APP_BACKEND_URL + "/posts", {
      post_id: idInput,
      title: titleInput,
      tags: tagsInput,
      text: textInput,
    })
      .then(function (response) {
        const post = response.data.data;
        window.location.href = '/p/' + post.id + '/' + post.title.replaceAll(' ', '+');
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
      axios.post(process.env.REACT_APP_BACKEND_URL + "/asset-files/upload", {
        entity: 'post',
        entity_id: idInput,
        type: 'banner',
        meta: {
          name: file.name.replace(/\.[^/.]+$/, ''),
          size: file.size,
          mime: file.type
        },
        file: reader.result.replace(/data:(.*?)\/(.*?);base64,/, '')
      })
        .then(function (response) {
          setBannerInput(response.data.data.path);
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

  function removeBanner(event) {
    event.preventDefault();

    axios.post(process.env.REACT_APP_BACKEND_URL + "/asset-files/delete", {
      entity: 'post',
      entity_id: idInput,
      type: 'banner',
    })
      .then(function (response) {
        document.getElementById('banner-input').value = '';
        setBannerInput(null);
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
      <SEO info={{ title: t('actions.edit_post') }} />
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
            <Heading textAlign='center' size='lg'>{t('actions.edit_post')}</Heading>
          </CardHeader>
        </Card>

        <Card w={{ base: '100%', lg: '70%' }} mx='auto' mb={5} pb={{ base: 12, md: 7 }} minH='500px'>
          <CardBody>
            <FormControl>
              <FormLabel>{t('post.title')}</FormLabel>
              <Input type='text' placeholder={t('placeholders.post_title')} value={titleInput} onChange={(e) => { setTitleInput(e.target.value) }} />
            </FormControl>

            <FormControl my={5}>
              <FormLabel>{t('post.tags')}</FormLabel>
              <Menu matchWidth={true}>
                <MenuButton
                  as={Button}
                  rightIcon={<IconButton
                    icon={<Icon as={ChevronDownIcon} color={selectMenuFontColor} boxSize='1.4rem' />}
                    h='32px'
                    w='32px'
                    minW={0}
                    bg={selectMenuBg}
                    variant='ghost'
                  />}
                  matchWidth={true}
                  bg={selectMenuBg}
                  color={selectMenuFontColor}
                  variant='outline'
                  textAlign='left'
                  w='100%'
                  pr={1}
                  fontSize='md'
                  fontWeight='100'
                  borderColor='#e2e8f0'
                  borderWidth='1px'
                  _hover={{ bg: selectMenuBg }}
                >
                  {
                    tagsInput.length > 0 ?
                      <HStack spacing={3}>
                        {
                          tagsInput.map(function (tag, i) {
                            return (
                              <Badge key={i} p={1} color={selectMenuFontColor}>
                                {'#' + tag}
                              </Badge>
                            );
                          })
                        }
                      </HStack>
                      :
                      t('placeholders.post_tags')
                  }
                </MenuButton>

                <MenuList matchWidth={true} h='215px' overflowY='scroll'>
                  {tagsList.length ? tagsList.map(function (tag, i) {
                    return (
                      <MenuItem matchWidth={true} key={tag.id} onClick={(e) => {
                        if (tagsInput.length == 5) {
                          return;
                        }

                        if (tagsInput.includes(tag.name)) {
                          setTagsInput(tagsInput.filter((t) => {
                            return (t !== tag.name);
                          }));

                          return;
                        }

                        setTagsInput(currentTags => [...currentTags, tag.name]);
                      }}>
                        <Text>{tag.name}</Text>
                      </MenuItem>
                    );
                  }) : ''}
                </MenuList>
              </Menu>
            </FormControl>

            <FormControl my={5}>
              <FormLabel>{t('post.banner')}</FormLabel>
              <HStack spacing={2}>
                <Box w='200px' h='100px' mr={3}>
                  <Image
                    src={bannerInput}
                    fallbackSrc='/images/placeholder-image.png'
                  />
                </Box>
                <Box mr={3} w='full'>
                  <Input type='file' id="banner-input" pt={1} onChange={handleFileInput} accept=".jpeg, .jpg, .png" />
                </Box>
                <Box>
                  <Tooltip label={t('actions.remove')}>
                    <IconButton
                      colorScheme='brand'
                      icon={<Icon as={MdRemoveCircle} boxSize={6} />}
                      onClick={(e) => {
                        if (!bannerInput) {
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
              <FormLabel>{t('post.text')}</FormLabel>
              <Editor
                value={textInput}
                handler={setTextInput}
                height={"300px"}
                placeholder={t('placeholders.post_text')}
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
        handler={removeBanner}
      />
    </>
  );
}
