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
  Tooltip,
} from '@chakra-ui/react';

import { MdEditSquare } from 'react-icons/md';

export function ProfileCommunityCard({ community }) {
  return (
    <Card p={5} position='relative'>
      <Link _hover={{ textDecoration: "none" }}>
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
          <Image boxSize={8} src={community.logo} fallbackSrc='/images/group-placeholder.png' />

          <Box>
            <Heading size='sm'>{community.name}</Heading>
            <Text fontSize='xs'>{community.members} members </Text>
          </Box>
        </Flex>
      </Link>

      <Tooltip label='Edit'>
        <IconButton
          as='a'
          href='/edit-community'
          icon={<Icon as={MdEditSquare} />}
          position='absolute'
          top='7px'
          right='7px'
          color='brand.main'
          variant='ghost'
          minWidth='10px'
          width='10px'
          height='10px'
          padding='0'
        />
      </Tooltip>
    </Card>
  );
}