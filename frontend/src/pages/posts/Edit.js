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
  Image,
  useToast,
} from "@chakra-ui/react";
import { Footer } from "../../components/Footer";
import { MdRemoveCircle } from "react-icons/md";
import { useState, useEffect } from "react";
import { Editor } from "../../components/Editor";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { SEO } from "../../components/SEO";
import { MultiSelect, useMultiSelect } from 'chakra-multiselect'
import axios from 'axios';

export function Edit() {
  const [idInput, setIdInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [bannerInput, setBannerInput] = useState('');
  const [tagsList, setTagsList] = useState([]);
  const { t } = useTranslation();
  const { id } = useParams();
  const toast = useToast();

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

    // axios.get(process.env.REACT_APP_BACKEND_URL + "/posts/tags")
    //   .then(function (response) {
    //     let tags = [];
    //     response.data.data.forEach((tag) => {
    //       tags.push(tag.name);
    //     });

    //     setTagsList(tags);
    //     console.log(tagsList)
    //   })
    //   .catch(function (error) {
    //     toast({
    //       title: error.response.data.message,
    //       status: 'error',
    //       position: 'top-right',
    //       duration: 9000,
    //       isClosable: true,
    //     });
    //   });
  }, []);

  function submit(event) {
    event.preventDefault();

    axios.put(process.env.REACT_APP_BACKEND_URL + "/posts", {
      post_id: idInput,
      title: titleInput,
      tags: [], // tagsInput,
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

  const { value, options, onChange } = useMultiSelect({
    value: [],
    options: tagsList ?? []
  });

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
              <MultiSelect
                options={options}
                value={value}
                placeholder={t('placeholders.post_tags')}
                onChange={onChange}
                create
              />
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
    </>
  );
}
