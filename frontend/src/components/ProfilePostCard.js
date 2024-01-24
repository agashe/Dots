import {
  Flex,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Text,
  Image,
  Button,
  Icon,
  IconButton,
  Spacer,
  Link,
  HStack,
  Stack,
  Tooltip,
} from '@chakra-ui/react';

import {
  MdThumbsUpDown,
  MdChat,
  MdOutlineShare,
  MdEditSquare,
} from 'react-icons/md';

export function ProfilePostCard({ post }) {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      position='relative'
      overflow='hidden'
      variant='outline'
      h='200px'
    >
      <Image
        objectFit='cover'
        w='200px'
        h='auto'
        minW='200px'
        maxW={{ base: '100%', sm: '200px' }}
        maxH={{ base: '100%', sm: '200px' }}
        src={post.image}
        alt={post.title}
        fallbackSrc='images/placeholder-image.png'
        style={{ cursor: 'pointer' }}
      />

      <Stack w='100%'>
        <CardHeader py={0} pt={3}>
          <Heading size='md'>{post.title}</Heading>
        </CardHeader>
        <CardBody py={0}>

          <Text fontSize='sm' my={1}>{post.date} @ <Link>{post.community}</Link> </Text>

          <HStack spacing='24px' color='brand.main'>
            {
              post.tags.map((tag) => {
                return <Text fontSize='md'><Link>#{tag}</Link></Text>;
              })
            }
          </HStack>
        </CardBody>

        <CardFooter py={0} pb={2}>
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
      </Stack>

      <Tooltip label='Edit'>
        <IconButton
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