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
import { useTranslation } from "react-i18next";

export function UserCard({ user }) {
  const { t } = useTranslation();

  return (
    <Card mr={{ base: 0, lg: 5 }} mb={5}>
      <CardBody>
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
          <Avatar
            name={user.name}
            src={user.avatar}
            bg='brand.main'
            color='white'
          />

          <Box>
            <Heading size='sm'>{user.name}</Heading>
            <Text fontSize='xs'>{user.posts_count} {t('posts')} </Text>
          </Box>

          <Divider />
          
          <Box>
            <Text fontSize='sm'>
              {user.bio}
            </Text>
          </Box>

          <Divider />

          <Box>
            <Stack spacing={3}>
              <Text>
                <Icon as={MdCake} mr={2} />
                {user.birth_date}
              </Text>

              <Text>
                <Icon as={MdMap} mr={2} />
                {user.location}
              </Text>

              <Text>
                <Icon as={MdCardMembership} mr={2} />
                {user.work}
              </Text>
            </Stack>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
}
