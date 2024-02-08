import { Card, CardBody, Heading } from "@chakra-ui/react";

export function TagCard() {
  return (
    <Card mr={{ base: 0, lg: 5 }} mb={5}>
      <CardBody color='brand.main' p={{ base: 2, lg: 5 }}>
        <Heading size={{ base: 'md', lg: 'lg' }}>#Travel</Heading>
      </CardBody>
    </Card>
  );
}
