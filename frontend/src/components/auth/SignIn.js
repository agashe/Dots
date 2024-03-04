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
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function SignIn({ isOpen, onClose, onOpenSignUp }) {
  const [inputs] = useState([]); //setInputs
  const { t } = useTranslation();

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
        <ModalHeader>{t('user.sign_in_hint')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>{t('user.email')}</FormLabel>
            <Input type='email' placeholder={t('user.email')} onChange={handleInput} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>{t('user.password')}</FormLabel>
            <Input
              type='password'
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
