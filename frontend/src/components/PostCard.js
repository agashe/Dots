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
        alt='Green double couch with wooden legs'
        borderTopRadius='lg'
        fallbackSrc='images/placeholder-image.png'
      />

      <CardHeader py={0} pt={3}>
        <Flex spacing='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar name={post.user.name} src={post.user.avatar} bg='brand.main' color='white' />

            <Box>
              <Heading size='sm'>{post.user.name}</Heading>
              <Text fontSize='xs'>{post.date} @ <Link>{post.community}</Link> </Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody py={0} my={5}>
        <Heading size='md'>{post.title}</Heading>

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
          <Tooltip label='Rate'>
            <Button variant='ghost' leftIcon={<Icon as={MdThumbsUpDown} />}>
              {post.counters.rate}
            </Button>
          </Tooltip>

          <Spacer />

          <Tooltip label='Comments'>
            <Button variant='ghost' leftIcon={<Icon as={MdChat} />}>
            {post.counters.comments}
            </Button>
          </Tooltip>

          <Spacer />

          <Button variant='ghost' leftIcon={<Icon as={MdOutlineShare} />}>
            Share
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
}