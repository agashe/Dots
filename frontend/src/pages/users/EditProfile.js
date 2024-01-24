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
} from '@chakra-ui/react';

import { Footer } from '../../components/Footer';
import { MdRemoveCircle } from 'react-icons/md';

export function EditProfile() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Flex pt={5} px={10} bg='gray.50' minHeight='90vh' flexDirection='column' >
      <Card w='70%' mx='auto' mb={5} justifyContent='center' alignItems='center' textAlign='center'>
        <CardHeader>
          <Heading textAlign='center'>Edit Profile</Heading>
        </CardHeader>
      </Card>

      <Card w='70%' mx='auto' mb={5}>
        <CardBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type='text' placeholder='John Doe' />
          </FormControl>

          <FormControl my={5}>
            <FormLabel>Avatar</FormLabel>
            <HStack>
              <Box mr={3}>
                <Avatar name='Ahmed Omar' src='https://avatarfiles.alphacoders.com/372/372516.jpg' bg='brand.main' color='white' boxSize={10} />
              </Box>
              <Box mr={3} w='full'>
                <Input type='file' pt={1} />
              </Box>
              <Box>
                <Tooltip label='Remove'>
                  <IconButton colorScheme='brand' icon={<Icon as={MdRemoveCircle} boxSize={6} />} />
                </Tooltip>
              </Box>
            </HStack>
          </FormControl>

          <FormControl my={5}>
            <FormLabel>Location</FormLabel>
            <Input type='text' placeholder='South Pole, The Antarctica' />
          </FormControl>

          <FormControl my={5}>
            <FormLabel>Work</FormLabel>
            <Input type='text' placeholder='Rocket Scientist' />
          </FormControl>

          <FormControl my={5}>
            <FormLabel>Birth Date</FormLabel>
            <Input type='date' />
          </FormControl>

          <FormControl my={5}>
            <FormLabel>Bio</FormLabel>
            <Textarea placeholder='Tell the people about yourself' resize='none' />
          </FormControl>
        </CardBody>
      </Card >
      
      <Card w='70%' mx='auto' mb={5}>
        <CardHeader pb={0} mb={0}>
          <Heading size='md' textAlign='center'>Update your password</Heading>
        </CardHeader>

        <CardBody>
          <HStack>
            <Box mr={3} w='50%'>
              <FormControl my={5}>
                <FormLabel>New Password</FormLabel>
                <Input type='password' placeholder='Pick a strong Password' />
              </FormControl>
            </Box>
            <Box w='50%'>
            <FormControl my={5}>
                <FormLabel>Confirm Password</FormLabel>
                <Input type='password' placeholder='Re-Enter the strong Password' />
              </FormControl>
            </Box>
          </HStack>
        </CardBody>
      </Card >

      <Card w='70%' mx='auto' mb={5} justifyContent='center' alignItems='center' textAlign='center'>
        <CardHeader w='100%'>
          <Button w='100%'>Save</Button>
        </CardHeader>
      </Card>

      <Spacer />

      <Footer />
    </Flex >
  );
}