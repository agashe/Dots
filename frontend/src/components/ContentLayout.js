import {
  Flex,
  Card,
  CardBody,
  Heading,
  CardHeader,
  Text,
  Spacer,
} from '@chakra-ui/react';

import parse from 'html-react-parser';

export function ContentLayout({ title, content }) {
  return (
    <Flex pt={5} px={10} bg='gray.50' minHeight='90vh' flexDirection='column' >
      <Card w='70%' mx='auto' mb={5}>
        <CardHeader py={0} pt={3}>
          <Heading textAlign='center'>{ title }</Heading>
        </CardHeader>

        <CardBody py={0} my={5}>
          <Text>{ parse(content) }</Text>
        </CardBody>
      </Card>

      <Spacer />
      
      <small style={{ padding: '10px 0', textAlign:'center' }}>Dots &copy; {(new Date().getFullYear())}, All Rights Reserved</small>
    </Flex>
  );
}