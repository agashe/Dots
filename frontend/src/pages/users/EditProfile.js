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
} from "@chakra-ui/react";
import { Footer } from "../../components/Footer";
import { MdRemoveCircle } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";

export function EditProfile() {
  // const user = JSON.parse(localStorage.getItem("user"));
  const { t } = useTranslation();

  return (
    <>
      <SEO info={{ title: t('actions.edit_profile') }} />
      <Flex pt={5} px={{ base: 3, lg: 10 }}  minHeight='100vh' flexDirection='column'>
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
              <Input type='text' placeholder={t('placeholders.user_name')} />
            </FormControl>

            <FormControl my={5}>
              <FormLabel>{t('user.email')}</FormLabel>
              <Input type='text' placeholder={t('placeholders.user_email')} disabled />
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
              <Input type='text' placeholder={t('placeholders.user_location')} />
            </FormControl>

            <FormControl my={5}>
              <FormLabel>{t('user.work')}</FormLabel>
              <Input type='text' placeholder={t('placeholders.user_work')} />
            </FormControl>

            <FormControl my={5}>
              <FormLabel>{t('user.birth_date')}</FormLabel>
              <Input type='date' />
            </FormControl>

            <FormControl my={5}>
              <FormLabel>{t('user.bio')}</FormLabel>
              <Textarea
                placeholder={t('placeholders.user_bio')}
                resize='none'
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
                  <Input type='password' placeholder={t('placeholders.user_current_password')} />
                </FormControl>
              </Box>
              <Box mr={3} w='33%'>
                <FormControl my={5}>
                  <FormLabel>{t('user.new_password')}</FormLabel>
                  <Input type='password' placeholder={t('placeholders.user_password')} />
                </FormControl>
              </Box>
              <Box w='33%'>
                <FormControl my={5}>
                  <FormLabel>{t('user.confirm')}</FormLabel>
                  <Input
                    type='password'
                    placeholder={t('placeholders.user_confirm')}
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
            <Button w='100%'>{t('actions.save')}</Button>
          </CardHeader>
        </Card>

        <Spacer />

        <Footer />
      </Flex>
    </>
  );
}
