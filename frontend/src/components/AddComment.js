import {
  Card,
  CardBody,
  CardFooter,
  FormControl,
  Button,
} from "@chakra-ui/react";
import { Editor } from "./Editor";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function AddComment({ postId }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [text, setText] = useState("");
  const { t } = useTranslation();

  console.log(user, postId);

  return (
    <Card ml={{ base: 0, lg: 5 }} mb={5} height={{ base: '450px', md: '225px' }}>
      <CardBody py={1}>
        <FormControl my={3}>
          <Editor
            value={text}
            handler={setText}
            height={window.innerWidth < 500 ? '250px' : '100px'}
            placeholder={t('thank_you')}
          />
        </FormControl>
      </CardBody>

      <CardFooter pt={0} pb={3}>
        <Button>{t('actions.comment')}</Button>
      </CardFooter>
    </Card>
  );
}
