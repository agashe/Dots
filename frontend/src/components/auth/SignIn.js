import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
} from "@chakra-ui/react";

import { useState } from "react";

export function SignIn({ isOpen, onClose, onOpenSignUp }) {
  const [inputs] = useState([]); //setInputs

  function submitSignIn(event) {
    event.preventDefault();

    const user = {
      name: "Ahmed Omar",
      avatar: "https://avatarfiles.alphacoders.com/372/372516.jpg",
      email: inputs["email"],
      password: inputs["password"],
      token: "123",
    };

    localStorage.setItem("user", JSON.stringify(user));

    window.location.href = "/";
  }

  function handleInput(event) {
    inputs[event.target.name] = event.target.value;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent textAlign='center'>
        <ModalHeader>Sign in to your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type='email' placeholder='Email' onChange={handleInput} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              placeholder='Password'
              onChange={handleInput}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter flexDirection='column'>
          <Button colorScheme='blue' width='100%' mb={2} onClick={submitSignIn}>
            Sign In
          </Button>

          <Link
            onClick={() => {
              onClose();
              onOpenSignUp();
            }}
          >
            {`Don't have account yet , register now !`}
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
