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
} from "@chakra-ui/react";
import { Footer } from "../../components/Footer";
import { MdRemoveCircle, MdArrowDownward } from "react-icons/md";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Editor } from "../../components/Editor";
import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";
import { MultiSelect, useMultiSelect } from 'chakra-multiselect'

export function Create() {
  const [body, setBody] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState({});
  const { t } = useTranslation();

  const communities = [
    {
      id: 1,
      name: "The Unknown",
      logo: "unknown.png",
    },
    {
      id: 2,
      name: "Cool_people",
      logo: "images/sun-icon.png",
    },
  ];

  const { value, options, onChange } = useMultiSelect({
    value: [],
    options: ["1", "2", "3"]
  });

  return (
    <>
      <SEO info={{ title: t('actions.create_post') }} />
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
            <Heading textAlign='center'>{t('actions.create_post')}</Heading>
          </CardHeader>
        </Card>

        <Card w='70%' mx='auto' mb={5} pb={8}>
          <CardBody>
            <FormControl>
              <FormLabel>{t('post.title')}</FormLabel>
              <Input type='text' placeholder={t('placeholders.post_title')} />
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
                    icon={<Icon as={ChevronDownIcon} color='black' boxSize='1.4rem' />}
                    h='32px'
                    w='32px'
                    minW={0}
                    colorScheme='gray'
                    variant='ghost'
                  />}
                  matchWidth={true}
                  bg='white'
                  color={selectedCommunity.id ? 'black' : '#b9c1cb'}
                  variant='outline'
                  textAlign='left'
                  w='100%'
                  pr={1}
                  fontSize='md'
                  fontWeight='100'
                  borderColor='#e2e8f0'
                  borderWidth='1px'
                  _hover={{ bg: 'white' }}
                >
                  {
                    selectedCommunity.id ?
                      <HStack>
                        <Image
                          boxSize={7}
                          src='/unknown.png'
                          fallbackSrc='/images/group-placeholder.png'
                          mr={2}
                        />
                        <Text>{selectedCommunity.name}</Text>
                      </HStack> :
                      t('placeholders.post_community')
                  }
                </MenuButton>

                <MenuList matchWidth={true}>
                  {communities.map(function (community, i) {
                    return (
                      <MenuItem matchWidth={true} key={i} onClick={() => { setSelectedCommunity(community) }}>
                        <Image
                          boxSize={7}
                          src='/unknown.png'
                          fallbackSrc='/images/group-placeholder.png'
                          mr={5}
                        />
                        <Text>{community.name}</Text>
                      </MenuItem>
                    );
                  })}
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
                value={body}
                handler={setBody}
                height={"300px"}
                placeholder={t('placeholders.post_text')}
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
