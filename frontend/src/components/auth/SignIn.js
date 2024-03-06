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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axios from 'axios';

export function SignIn({ isOpen, onClose, onOpenSignUp }) {
  const [inputs, setInputs] = useState([]);
  const { t } = useTranslation();
  const toast = useToast();

  function submitSignIn(event) {
    event.preventDefault();

    axios.post(process.env.REACT_APP_BACKEND_URL + "/auth/sign-in", {
      name: inputs['name'],
      email: inputs['email'],
      password: inputs['password'],
      confirm: inputs['confirm'],
    })
      .then(function (response) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        window.location.href = "/";
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

  function handleInput(event) {
    inputs[event.target.name] = event.target.value;
    setInputs(inputs);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent textAlign='center'>
        <ModalHeader>{t('user.sign_in_hint')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>{t('user.email')}</FormLabel>
            <Input type='email' name='email' placeholder={t('user.email')} onChange={handleInput} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>{t('user.password')}</FormLabel>
            <Input
              type='password'
              name='password'
              placeholder={t('user.password')}
              onChange={handleInput}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter flexDirection='column'>
          <Button colorScheme='blue' width='100%' mb={2} onClick={submitSignIn}>
            Sign In
          </Button>

          <Link reloadDocument
            onClick={() => {
              onClose();
              onOpenSignUp();
            }}
          >
            {t('user.register_now')}
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
