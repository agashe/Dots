import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  Image,
  Flex,
  Button,
} from "@chakra-ui/react";

export function CommunityCard() {
  return (
    <Card mr={5} mb={5}>
      <CardBody>
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
          <Image
            boxSize={10}
            src='unknown.png'
            fallbackSrc='/images/group-placeholder.png'
          />

          <Box>
            <Heading size='sm'>The Unknown</Heading>
            <Text fontSize='xs'>2 members </Text>
          </Box>
          <Box>
            <Text fontSize='sm'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              et neque lectus. Suspendisse venenatis imperdiet lobortis. Duis
              euismod neque ac convallis molestie
            </Text>
          </Box>

          <Box w='100%'>
            <Button w='100%'>Join</Button>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
}
