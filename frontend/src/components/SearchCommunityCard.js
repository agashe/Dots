import {
  Flex,
  Box,
  Card,
  Heading,
  Text,
  Image,
  Link,
  Icon,
  IconButton,
} from '@chakra-ui/react';

import { Link as ReactRouterLink } from 'react-router-dom'

export function SearchCommunityCard({ community }) {
  return (
    <Card p={5} position='relative'>
      <Link _hover={{ textDecoration: "none" }} as={ReactRouterLink} to={'/c/Cool_people'}>
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
          <Image boxSize={8} src={community.logo} fallbackSrc='/images/group-placeholder.png' />

          <Box>
            <Heading size='sm'>{community.name}</Heading>
            <Text fontSize='xs'>{community.members} members </Text>
          </Box>
        </Flex>
      </Link>
    </Card>
  );
}