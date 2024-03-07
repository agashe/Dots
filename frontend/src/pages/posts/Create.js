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
  Image,
  IconButton,
  Icon,
  Tooltip,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Footer } from "../../components/Footer";
import { MdRemoveCircle, MdArrowDownward } from "react-icons/md";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { Editor } from "../../components/Editor";
import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";
import { MultiSelect, useMultiSelect } from 'chakra-multiselect'
import axios from 'axios';

export function Create() {
  const communitySelectBg = useColorModeValue('gray.50', 'gray.700');
  const communitySelectFontColor = useColorModeValue('black', '#b9c1cb');
  const [titleInput, setTitleInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [communityInput, setCommunityInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [communitiesList, setCommunitiesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const { t } = useTranslation();
  const toast = useToast();

  useEffect(function () {
    axios.get(process.env.REACT_APP_BACKEND_URL + "/users/communities")
      .then(function (response) {
        setCommunitiesList(response.data.data);
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

    axios.post(process.env.REACT_APP_BACKEND_URL + "/posts", {
      community_id: communityInput.id,
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
      <SEO info={{ title: t('actions.create_post') }} />
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
            <Heading textAlign='center' size='lg'>{t('actions.create_post')}</Heading>
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
              <FormLabel>{t('community._')}</FormLabel>
              <Menu matchWidth={true}>
                <MenuButton
                  as={Button}
                  rightIcon={<IconButton
                    icon={<Icon as={ChevronDownIcon} color={communitySelectFontColor} boxSize='1.4rem' />}
                    h='32px'
                    w='32px'
                    minW={0}
                    bg={communitySelectBg}
                    variant='ghost'
                  />}
                  matchWidth={true}
                  bg={communitySelectBg}
                  color={communitySelectFontColor}
                  variant='outline'
                  textAlign='left'
                  w='100%'
                  pr={1}
                  fontSize='md'
                  fontWeight='100'
                  borderColor='#e2e8f0'
                  borderWidth='1px'
                  _hover={{ bg: communitySelectBg }}
                >
                  {
                    communityInput.id ?
                      <HStack>
                        <Image
                          boxSize={7}
                          src={communityInput.logo}
                          fallbackSrc='/images/group-placeholder.png'
                          mr={2}
                        />
                        <Text color={communitySelectFontColor}>
                          {communityInput.name}
                        </Text>
                      </HStack> :
                      t('placeholders.post_community')
                  }
                </MenuButton>

                <MenuList matchWidth={true}>
                  {communitiesList.length ? communitiesList.map(function (community, i) {
                    return (
                      <MenuItem matchWidth={true} key={community.id} onClick={(e) => { setCommunityInput(community) }}>
                        <Image
                          boxSize={7}
                          src={community.logo}
                          fallbackSrc='/images/group-placeholder.png'
                          mr={5}
                        />
                        <Text>{community.name}</Text>
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
                    src='images/placeholder-image.png'
                    fallbackSrc='images/placeholder-image.png'
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
            <Button w='100%' onClick={submit}>{t('actions.create')}</Button>
          </CardHeader>
        </Card>

        <Spacer />

        <Footer />
      </Flex>
    </>
  );
}
