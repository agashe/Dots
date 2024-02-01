import { Card, Heading, Text, Icon } from "@chakra-ui/react";
import { MdErrorOutline } from "react-icons/md";

export function NoResults({ message }) {
  return (
    <Card
      boxSize='lg'
      mx='auto'
      mb={5}
      textAlign='center'
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon as={MdErrorOutline} boxSize={48} color='brand.main' />

      <Heading>No Results Found</Heading>

      <Text mt={5}>{message}</Text>
    </Card>
  );
}
