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
import { useTranslation } from "react-i18next";

export function SignUp({ isOpen, onClose }) {
  const [inputs] = useState([]); //setInputs
  const { t } = useTranslation();

  function submitSignUp(event) {
    event.preventDefault();

    const user = {
      name: "ahmed",
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
        <ModalHeader>{t('user.sign_up_hint')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>{t('user.name')}</FormLabel>
            <Input type='text' placeholder={t('user.name')} onChange={handleInput} />
          </FormControl>

          <FormControl>
            <FormLabel>{t('user.email')}</FormLabel>
            <Input type='email' placeholder={t('user.email')} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>{t('user.password')}</FormLabel>
            <Input type='password' placeholder={t('user.password')} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>{t('user.confirm')}</FormLabel>
            <Input type='password' placeholder={t('user.confirm')} />
          </FormControl>
        </ModalBody>

        <ModalFooter flexDirection='column'>
          <small>
            {t('user.accept_terms')}
            <Link color='brand.main'>{t('terms')}</Link>
          </small>

          <Button colorScheme='blue' width='100%' my={2} onClick={submitSignUp}>
            {t('actions.create')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
