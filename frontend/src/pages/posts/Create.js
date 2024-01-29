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
  Image,
  IconButton,
  Icon,
  Tooltip,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

import { Footer } from '../../components/Footer';
import { MdRemoveCircle, MdArrowDownward } from 'react-icons/md';

import { useState } from 'react';
import { Editor } from '../../components/Editor';

export function Create() {
  const [body, setBody] = useState('');

  return (
    <Flex pt={5} px={10} bg='gray.50' minHeight='90vh' flexDirection='column' >
      <Card w='70%' mx='auto' mb={5} justifyContent='center' alignItems='center' textAlign='center'>
        <CardHeader>
          <Heading textAlign='center'>Create Post</Heading>
        </CardHeader>
      </Card>

      <Card w='70%' mx='auto' mb={5}>
        <CardBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input type='text' placeholder='Solar system' />
          </FormControl>

          <FormControl my={5}>
            <FormLabel>Community</FormLabel>
            <Menu maxW={2000} w='full'>
              <MenuButton as={Button} rightIcon={<Icon as={MdArrowDownward} /> }
                w='100%'
                bg='white'
                borderColor='black'
                color='black'
                variant='outline'
                textAlign='center'
              >
                Select a community to publish your post
              </MenuButton>
              <MenuList maxW={2000} minW={0} width='90%'>
                <MenuItem minH='48px'  maxW={2000} w='100%'>
                  <Image
                    boxSize='2rem'
                    borderRadius='full'
                    src='https://placekitten.com/100/100'
                    alt='Fluffybuns the destroyer'
                    mr='12px'
                  />
                  <span>Fluffybuns the Destroyer</span>
                </MenuItem>
                <MenuItem minH='40px'  maxW={2000} w='full'>
                  <Image
                    boxSize='2rem'
                    borderRadius='full'
                    src='https://placekitten.com/120/120'
                    alt='Simon the pensive'
                    mr='12px'
                  />
                  <span>Simon the pensive</span>
                </MenuItem>
              </MenuList>
            </Menu>
          </FormControl>

          <FormControl my={5}>
            <FormLabel>Banner</FormLabel>
            <HStack spacing={2}>
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
            <FormLabel>Text</FormLabel>
            <Editor value={body} handler={setBody} height={'300px'} />
          </FormControl>
        </CardBody>
      </Card>

      <Card w='70%' mx='auto' mb={5} justifyContent='center' alignItems='center' textAlign='center'>
        <CardHeader w='100%'>
          <Button w='100%'>Create</Button>
        </CardHeader>
      </Card>

      <Spacer />

      <Footer />
    </Flex >
  );
}