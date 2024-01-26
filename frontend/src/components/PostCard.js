import {
  Flex,
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  CardHeader,
  Avatar,
  Text,
  Divider,
  Image,
  Button,
  Icon,
  Spacer,
  Link,
  HStack,
  Tooltip,
} from '@chakra-ui/react';

import { Link as ReactRouterLink } from 'react-router-dom'

import {
  MdThumbsUpDown,
  MdChat,
  MdOutlineShare,
} from 'react-icons/md';

export function PostCard({ post }) {
  return (
    <Card w='90%' mx='auto' mb={5}>
      <Image
        src={post.image}
        alt={post.title}
        maxHeight='400px'
        borderTopRadius='lg'
        fallbackSrc='/images/placeholder-image.png'
        style={{ cursor: 'pointer' }}
      />

      <CardHeader py={0} pt={3}>
        <Flex spacing='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Link as={ReactRouterLink} to={'/u/1/ahmed'}>
              <Avatar name={post.user.name} src={post.user.avatar} bg='brand.main' color='white' />
            </Link>

            <Box>
              <Link as={ReactRouterLink} to={'/u/1/ahmed'}>
                <Heading size='sm'>{post.user.name}</Heading>
              </Link>
              <Text fontSize='xs'>{post.date} @ <Link as={ReactRouterLink} to={'/c/' + post.community}>{post.community}</Link> </Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody py={0} my={5}>
        <Link style={{ textAlign: 'left' }} as={ReactRouterLink} to={'/p/1/ahmed'}>
          <Heading size='md'>{post.title}</Heading>
        </Link>

        <HStack mt={5} spacing='24px' color='brand.main'>
          {
            post.tags.map((tag) => {
              return <Text fontSize='md'><Link>#{tag}</Link></Text>;
            })
          }
        </HStack>
      </CardBody>

      <Divider />

      <CardFooter py={2}>
        <Flex w='100%'>
          <Link>
            <Tooltip label='Rate'>
              <Button variant='ghost' leftIcon={<Icon as={MdThumbsUpDown} />} _hover={{ textDecoration: "none" }}>
                {post.counters.rate}
              </Button>
            </Tooltip>
          </Link>

          <Spacer />

          <Link>
            <Tooltip label='Comments'>
              <Button variant='ghost' leftIcon={<Icon as={MdChat} />} _hover={{ textDecoration: "none" }}>
                {post.counters.comments}
              </Button>
            </Tooltip>
          </Link>

          <Spacer />

          <Button variant='ghost' leftIcon={<Icon as={MdOutlineShare} />} _hover={{ textDecoration: "none" }}>
            Share
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
}