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
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axios from 'axios';

export function SignUp({ isOpen, onClose }) {
  const [inputs, setInputs] = useState([]);
  const { t } = useTranslation();
  const toast = useToast();

  function submitSignUp(event) {
    event.preventDefault();

    axios.post("/auth/sign-up", {
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
    let newInputs = inputs;
    newInputs[event.target.name] = event.target.value;
    setInputs(newInputs);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent textAlign='center'>
        <ModalHeader>{t('user.sign_up_hint')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>{t('user.name')}</FormLabel>
            <Input type='text' name='name' placeholder={t('user.name')} onChange={handleInput} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>{t('user.email')}</FormLabel>
            <Input type='email' name='email' placeholder={t('user.email')} onChange={handleInput} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>{t('user.password')}</FormLabel>
            <Input type='password' name='password' placeholder={t('user.password')} onChange={handleInput} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>{t('user.confirm')}</FormLabel>
            <Input type='password' name='confirm' placeholder={t('user.confirm')} onChange={handleInput} />
          </FormControl>
        </ModalBody>

        <ModalFooter flexDirection='column' pb={1}>
          <small>
            {t('user.accept_terms')}
            <Link reloadDocument color='brand.main'>{t('terms')}</Link>
          </small>

          <Button colorScheme='blue' width='100%' my={3} onClick={submitSignUp}>
            {t('actions.create')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
