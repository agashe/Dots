import { Card, CardBody, Heading } from "@chakra-ui/react";

export function TagCard() {
  return (
    <Card mr={5} mb={5}>
      <CardBody color='brand.main'>
        <Heading size='lg'>#Travel</Heading>
      </CardBody>
    </Card>
  );
}
