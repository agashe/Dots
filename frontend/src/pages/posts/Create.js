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

import { useState } from "react";
import { Editor } from "../../components/Editor";

export function Create() {
  const [body, setBody] = useState("");

  const communities = [
    {
      name: "The Unknown",
      logo: "unknown.png",
    },
    {
      name: "Cool_people",
      logo: "images/sun-icon.png",
    },
  ];

  return (
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
          <Heading textAlign='center'>Create Post</Heading>
        </CardHeader>
      </Card>

      <Card w='70%' mx='auto' mb={5} pb={8}>
        <CardBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input type='text' placeholder='Solar system' />
          </FormControl>

          <FormControl my={5}>
            <FormLabel>Community</FormLabel>
            <Menu matchWidth={true}>
              <MenuButton
                as={Button}
                rightIcon={<Icon as={MdArrowDownward} />}
                matchWidth={true}
                bg='white'
                color='gray.500'
                variant='outline'
                textAlign='left'
                w='100%'
                fontSize='md'
                fontWeight='normal'
                borderColor='gray.300'
                borderWidth='1px'
              >
                Select a community to publish your post
              </MenuButton>

              <MenuList matchWidth={true}>
                {communities.map(function (community, i) {
                  return (
                    <MenuItem matchWidth={true} key={i}>
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
            <FormLabel>Banner</FormLabel>
            <HStack spacing={2}>
              <Box mr={3} w='full'>
                <Input type='file' pt={1} />
              </Box>
              <Box>
                <Tooltip label='Remove'>
                  <IconButton
                    colorScheme='brand'
                    icon={<Icon as={MdRemoveCircle} boxSize={6} />}
                  />
                </Tooltip>
              </Box>
            </HStack>
          </FormControl>

          <FormControl my={5}>
            <FormLabel>Text</FormLabel>
            <Editor
              value={body}
              handler={setBody}
              height={"300px"}
              placeholder={"Add your post content"}
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
          <Button w='100%'>Create</Button>
        </CardHeader>
      </Card>

      <Spacer />

      <Footer />
    </Flex>
  );
}
