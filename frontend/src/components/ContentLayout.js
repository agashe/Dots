import {
  Flex,
  Card,
  CardBody,
  Heading,
  CardHeader,
  Text,
  Spacer,
} from "@chakra-ui/react";

import parse from "html-react-parser";

import { Footer } from "./Footer";
import { SEO } from "./SEO";

export function ContentLayout({ title, content }) {
  return (
    <>
      <SEO info={{ title: title }} />
      <Flex pt={5} px={{ base: 3, lg: 10 }}  minHeight='100vh' flexDirection='column'>
        <Card w={{ base: '100%', lg: '70%' }} mx='auto' mb={5}>
          <CardHeader py={0} pt={3}>
            <Heading textAlign='center' size='lg'>{title}</Heading>
          </CardHeader>

          <CardBody py={0} my={5} px={{ base: 2, lg: 5 }}>
            <Text>{parse(content)}</Text>
          </CardBody>
        </Card>

        <Spacer />

        <Footer />
      </Flex>
    </>
  );
}
