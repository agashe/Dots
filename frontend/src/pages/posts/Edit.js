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
} from "@chakra-ui/react";
import { Footer } from "../../components/Footer";
import { MdRemoveCircle } from "react-icons/md";
import { useState } from "react";
import { Editor } from "../../components/Editor";
import { useTranslation } from "react-i18next";

export function Edit() {
  const [body, setBody] = useState("");
  const { t } = useTranslation();

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
          <Heading textAlign='center'>{t('actions.edit_post')}</Heading>
        </CardHeader>
      </Card>

      <Card w='70%' mx='auto' mb={5} pb={8}>
        <CardBody>
          <FormControl>
            <FormLabel>{t('post.title')}</FormLabel>
            <Input type='text' placeholder={t('placeholders.post_title')} />
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
          <Button w='100%'>{t('actions.update')}</Button>
        </CardHeader>
      </Card>

      <Spacer />

      <Footer />
    </Flex>
  );
}
