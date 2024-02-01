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

export function Create() {
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
          <Heading textAlign='center'>Create Community</Heading>
        </CardHeader>
      </Card>

      <Card w='70%' mx='auto' mb={5}>
        <CardBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type='text' placeholder='The Avengers' />
          </FormControl>

          <FormControl my={5}>
            <FormLabel>Logo</FormLabel>
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
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder='Write something nice about the community'
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
          <Button w='100%'>Create</Button>
        </CardHeader>
      </Card>

      <Spacer />

      <Footer />
    </Flex>
  );
}
