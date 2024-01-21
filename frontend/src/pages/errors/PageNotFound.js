import {
  Flex,
  Card,
  Heading,
  Text,
  Spacer,
  Icon,
} from '@chakra-ui/react';

import { MdQuestionMark } from 'react-icons/md'

export function PageNotFound() {
  return (
    <Flex pt={5} px={10} bg='gray.50' minHeight='90vh' flexDirection='column'>
      <Card boxSize='lg' mx='auto' mb={5} textAlign='center' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Icon as={MdQuestionMark} boxSize={48} color='brand.main' />

        <Heading >404, Page Not Found</Heading>
        
        <Text mt={5}>
          Oops ! It seems that the page you are looking for , doesn't exists
        </Text>
      </Card>

      <Spacer />

      <small style={{ padding: '10px 0', textAlign: 'center' }}>Dots &copy; {(new Date().getFullYear())}, All Rights Reserved</small>
    </Flex>
  );
}