import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  Avatar,
  Flex,
  Stack,
  Icon,
  Divider,
} from "@chakra-ui/react";

import { MdCake, MdMap, MdCardMembership } from "react-icons/md";

export function UserCard() {
  return (
    <Card mr={5} mb={5}>
      <CardBody>
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
          <Avatar
            name='Ahmed Omar'
            src='https://avatarfiles.alphacoders.com/372/372516.jpg'
            bg='brand.main'
            color='white'
          />

          <Box>
            <Heading size='sm'>Ahmed Omar</Heading>
            <Text fontSize='xs'>200 posts </Text>
          </Box>

          <Box>
            <Text fontSize='sm'>
              I am a cool guy , who likes build stuff with assembly :)
            </Text>
          </Box>

          <Divider />

          <Box>
            <Stack spacing={3}>
              <Text>
                <Icon as={MdCake} mr={2} />
                30 Oct 1999
              </Text>

              <Text>
                <Icon as={MdMap} mr={2} />
                Zolo Lolo , Kal-Mangaro Islands
              </Text>

              <Text>
                <Icon as={MdCardMembership} mr={2} />
                Freelancer
              </Text>
            </Stack>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
}
