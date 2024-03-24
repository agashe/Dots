import {
  Card,
  CardBody,
  CardFooter,
  FormControl,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Editor } from "./Editor";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from 'axios';

export function AddComment({ postId, commentId = '' }) {
  const [textInput, setTextInput] = useState("");
  const { t } = useTranslation();
  const toast = useToast();

  function submit(event) {
    event.preventDefault();

    if (!textInput) {
      return;
    }

    axios.post("/comments", {
      post_id: postId,
      comment_id: commentId,
      text: textInput,
    })
      .then(function (response) {
        window.location.reload();
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
    <Card ml={{ base: 0, lg: 5 }} mb={5} height={{ base: '450px', md: '225px' }}>
      <CardBody py={1}>
        <FormControl my={3}>
          <Editor
            value={textInput}
            handler={setTextInput}
            height={window.innerWidth < 500 ? '250px' : '100px'}
            placeholder={t('thank_you')}
          />
        </FormControl>
      </CardBody>

      <CardFooter pt={0} pb={3}>
        <Button onClick={submit}>{t('actions.comment')}</Button>
      </CardFooter>
    </Card>
  );
}
