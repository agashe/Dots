import {
  Card,
  CardBody,
  CardFooter,
  FormControl,
  Button,
} from "@chakra-ui/react";
import { Editor } from "./Editor";
import { useState } from "react";

export function AddComment({ postId }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [text, setText] = useState("");

  console.log(user, postId);

  return (
    <Card ml={5} mb={5} height='225px'>
      <CardBody py={1}>
        <FormControl my={3}>
          <Editor
            value={text}
            handler={setText}
            height={"100px"}
            placeholder={"Thank you ..."}
          />
        </FormControl>
      </CardBody>

      <CardFooter pt={0} pb={3}>
        <Button>Comment</Button>
      </CardFooter>
    </Card>
  );
}
