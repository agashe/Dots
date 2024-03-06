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
  Textarea,
  Avatar,
  IconButton,
  Icon,
  Tooltip,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Footer } from "../../components/Footer";
import { MdRemoveCircle } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { SEO } from "../../components/SEO";
import axios from 'axios';

export function EditProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [nameInput, setNameInput] = useState(user.name);
  const [locationInput, setLocationInput] = useState(user.location);
  const [workInput, setWorkInput] = useState(user.work);
  const [birthDateInput, setBirthDateInput] = useState(user.birthDate);
  const [bioInput, setBioInput] = useState(user.bio);
  const [currentInput, setCurrentInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmInput, setConfirmInput] = useState('');
  const { t } = useTranslation();
  const toast = useToast();

  function submitEditProfile(event) {
    event.preventDefault();

    axios.put(process.env.REACT_APP_BACKEND_URL + "/users/profile", {
      name: nameInput,
      location: locationInput,
      work: workInput,
      birth_date: birthDateInput,
      bio: bioInput,
      current: currentInput,
      password: passwordInput,
      confirm: confirmInput,
    })
      .then(function (response) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        window.location.href = "/profile";
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
    <>
      <SEO info={{ title: t('actions.edit_profile') }} />
      <Flex pt={5} px={{ base: 3, lg: 10 }} minHeight='100vh' flexDirection='column'>
        <Card
          w={{ base: '100%', lg: '70%' }}
          mx='auto'
          mb={5}
          justifyContent='center'
          alignItems='center'
          textAlign='center'
        >
          <CardHeader>
            <Heading textAlign='center' size='lg'>{t('actions.edit_profile')}</Heading>
          </CardHeader>
        </Card>

        <Card w={{ base: '100%', lg: '70%' }} mx='auto' mb={5}>
          <CardBody>
            <FormControl>
              <FormLabel>{t('user.name')}</FormLabel>
              <Input type='text' name="name" value={nameInput} placeholder={t('placeholders.user_name')} onChange={(e) => {setNameInput(e.target.value)}} />
            </FormControl>

            <FormControl my={5}>
              <FormLabel>{t('user.email')}</FormLabel>
              <Input type='text' value={user.email} placeholder={t('placeholders.user_email')} disabled />
            </FormControl>

            <FormControl my={5}>
              <FormLabel>{t('user.avatar')}</FormLabel>
              <HStack>
                <Box mr={3}>
                  <Avatar
                    name='Ahmed Omar'
                    src='https://avatarfiles.alphacoders.com/372/372516.jpg'
                    bg='brand.main'
                    color='white'
                    boxSize={10}
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
              <FormLabel>{t('user.location')}</FormLabel>
              <Input type='text' name="location" value={user.location} placeholder={t('placeholders.user_location')} onChange={(e) => {setLocationInput(e.target.value)}} />
            </FormControl>

            <FormControl my={5}>
              <FormLabel>{t('user.work')}</FormLabel>
              <Input type='text' name="work" value={user.work} placeholder={t('placeholders.user_work')} onChange={(e) => {setWorkInput(e.target.value)}} />
            </FormControl>

            <FormControl my={5}>
              <FormLabel>{t('user.birth_date')}</FormLabel>
              <Input type='date' name="birth_date" value={user.birth_date} onChange={(e) => {setBirthDateInput(e.target.value)}} />
            </FormControl>

            <FormControl my={5}>
              <FormLabel>{t('user.bio')}</FormLabel>
              <Textarea
                name="bio" value={user.bio}
                placeholder={t('placeholders.user_bio')}
                resize='none'
                onChange={(e) => {setBioInput(e.target.value)}}
              />
            </FormControl>
          </CardBody>
        </Card>

        <Card w={{ base: '100%', lg: '70%' }} mx='auto' mb={5}>
          <CardHeader pb={0} mb={0}>
            <Heading size='md' textAlign='center'>
              {t('user.update_password_hint')}
            </Heading>
          </CardHeader>

          <CardBody>
            <HStack>
              <Box mr={3} w='33%'>
                <FormControl my={5}>
                  <FormLabel>{t('user.current_password')}</FormLabel>
                  <Input type='password' name="current" placeholder={t('placeholders.user_current_password')} onChange={(e) => {setCurrentInput(e.target.value)}} />
                </FormControl>
              </Box>
              <Box mr={3} w='33%'>
                <FormControl my={5}>
                  <FormLabel>{t('user.new_password')}</FormLabel>
                  <Input type='password' name="password" placeholder={t('placeholders.user_password')} onChange={(e) => {setPasswordInput(e.target.value)}} />
                </FormControl>
              </Box>
              <Box w='33%'>
                <FormControl my={5}>
                  <FormLabel>{t('user.confirm')}</FormLabel>
                  <Input
                    type='password'
                    name="confirm"
                    placeholder={t('placeholders.user_confirm')}
                    onChange={(e) => {setConfirmInput(e.target.value)}}
                  />
                </FormControl>
              </Box>
            </HStack>
          </CardBody>
        </Card>

        <Card
          w={{ base: '100%', lg: '70%' }}
          mx='auto'
          mb={5}
          justifyContent='center'
          alignItems='center'
          textAlign='center'
        >
          <CardHeader w='100%'>
            <Button w='100%' onClick={submitEditProfile}>{t('actions.save')}</Button>
          </CardHeader>
        </Card>

        <Spacer />

        <Footer />
      </Flex>
    </>
  );
}
