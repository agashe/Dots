import {
  Flex,
  Box,
  Card,
  Heading,
  Text,
  Link,
  Avatar,
} from '@chakra-ui/react';

import { Link as ReactRouterLink } from 'react-router-dom'

export function SearchUserCard({ user }) {
  return (
    <Card p={5} position='relative'>
      <Link _hover={{ textDecoration: "none" }} as={ReactRouterLink} to={'/u/1/ahmed'}>
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
          <Avatar name={user.name} src={user.avatar} bg='brand.main' color='white' />

          <Box>
            <Heading size='sm'>{user.name}</Heading>
            <Text fontSize='xs'>{user.posts} posts </Text>
          </Box>
        </Flex>
      </Link>
    </Card>
  );
}