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
} from "@chakra-ui/react";

import { Footer } from "../../components/Footer";
import { MdRemoveCircle } from "react-icons/md";

import { useState } from "react";
import { Editor } from "../../components/Editor";

export function Edit() {
  const [body, setBody] = useState("");

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
          <Heading textAlign='center'>Edit Post</Heading>
        </CardHeader>
      </Card>

      <Card w='70%' mx='auto' mb={5} pb={8}>
        <CardBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input type='text' placeholder='Solar system' />
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
              placeholder={"Update your post content"}
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
          <Button w='100%'>Update</Button>
        </CardHeader>
      </Card>

      <Spacer />

      <Footer />
    </Flex>
  );
}
