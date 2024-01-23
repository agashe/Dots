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
} from '@chakra-ui/react'

import { useState } from "react";

export function SignUp({ isOpen, onClose }) {
  const [inputs, setInputs] = useState([]);

  function submitSignUp(event) {
    event.preventDefault();

    const user = {
      name: 'ahmed',
      email: inputs['email'],
      password: inputs['password'],
      token: '123',
    };

    localStorage.setItem('user', JSON.stringify(user));

    window.location.href = "/";
  }

  function handleInput(event) {
    inputs[event.target.name] = event.target.value;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent textAlign='center'>
        <ModalHeader>Sign up account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type='text' placeholder='Name' />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type='email' placeholder='Email' />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input type='password' placeholder='Password' />
          </FormControl>
          
          <FormControl mt={4}>
            <FormLabel>Confirm</FormLabel>
            <Input type='password' placeholder='Confirm' />
          </FormControl>
        </ModalBody>

        <ModalFooter flexDirection='column'>
          <small>
            By click on the button bellow , you agreed to our : <Link color='brand.main'>Terms of usage</Link>
          </small>
 
          <Button colorScheme='blue' width='100%' my={2}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}