import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Flex,
  Box,
  Avatar,
  Text,
  Icon,
  IconButton,
  Link,
  HStack,
  Tooltip,
} from '@chakra-ui/react';

import { Link as ReactRouterLink } from 'react-router-dom'

import {
  MdThumbUp,
  MdThumbDown,
  MdOutlineThumbUp,
  MdOutlineThumbDown,
  MdChat,
  MdOutlineShare,
  MdOutlineErrorOutline,
} from 'react-icons/md';
import { AddComment } from './AddComment';

import { useState } from 'react';

export function Comment({ comment }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const [ addComment, setAddComment] = useState(false);

  function showAddComment(event) {
    setAddComment(!addComment);
  }

  return (
    <Card mb={5}>
      <CardHeader py={0} pt={3}>
        <Flex spacing='4'>
          <HStack>
            <Link as={ReactRouterLink} to={'/u/1/ahmed'}>
              <Avatar name={comment.user.name} src={comment.user.avatar} bg='brand.main' color='white' boxSize={6} />
            </Link>

            <Box>
              <Link as={ReactRouterLink} to={'/u/1/ahmed'}>
                <Heading size='sm'>{comment.user.name}</Heading>
              </Link>
            </Box>

            <Text fontSize='sm'>({comment.date})</Text>
          </HStack>
        </Flex>
      </CardHeader>

      <CardBody py={0} my={2}>
        <Text>{comment.title}</Text>
      </CardBody>

      <CardFooter py={2} pl='10px'>
        <HStack spacing={2}>
          <HStack spacing={2}>
            <Tooltip label='Rate Up'>
              <IconButton variant='ghost' icon={<Icon as={MdOutlineThumbUp} />} boxSize={4} color='lime' _hover={{ textDecoration: "none" }} />
            </Tooltip>

            <Text>{comment.rate}</Text>

            <Tooltip label='Rate Down'>
              <IconButton variant='ghost' icon={<Icon as={MdOutlineThumbDown} />} boxSize={4} color='blue' _hover={{ textDecoration: "none" }} />
            </Tooltip>
          </HStack>

          <Tooltip label='Comment'>
            <IconButton variant='ghost' boxSize={4} icon={<Icon as={MdChat} />} _hover={{ textDecoration: "none" }} onClick={showAddComment}/>
          </Tooltip>

          <Tooltip label='Share'>
            <IconButton variant='ghost' boxSize={4} icon={<Icon as={MdOutlineShare} />} _hover={{ textDecoration: "none" }} />
          </Tooltip>

          <Tooltip label='Report'>
            <IconButton variant='ghost' boxSize={4} icon={<Icon as={MdOutlineErrorOutline} />} _hover={{ textDecoration: "none" }} />
          </Tooltip>
        </HStack>
      </CardFooter>

      {
        addComment &&
        <Box mr={5}>
          <AddComment postId={1} />
        </Box>
      }

      <Box ml={5} mr={5}>
        {
          comment.sub_comments.length ?
            comment.sub_comments.map((comment) => {
              return <Comment comment={comment} />;
            })
            :
            ''
        }
      </Box>
    </Card>
  );
}