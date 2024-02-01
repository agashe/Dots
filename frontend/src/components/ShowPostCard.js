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
  IconButton,
  Link,
  HStack,
  Tooltip,
} from "@chakra-ui/react";

import { Link as ReactRouterLink } from "react-router-dom";

import {
  // MdThumbUp,
  // MdThumbDown,
  MdOutlineThumbUp,
  MdOutlineThumbDown,
  MdChat,
  MdOutlineShare,
  MdOutlineErrorOutline,
} from "react-icons/md";

import parse from "html-react-parser";

export function ShowPostCard({ post }) {
  return (
    <>
      <Card ml={5} mb={5}>
        <Image
          src={post.image}
          alt={post.title}
          maxHeight='500px'
          borderTopRadius='lg'
          fallbackSrc='/images/placeholder-image.png'
          style={{ cursor: "pointer" }}
        />

        <CardHeader py={0} pt={3}>
          <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Link as={ReactRouterLink} to={"/u/1/ahmed"}>
                <Avatar
                  name={post.user.name}
                  src={post.user.avatar}
                  bg='brand.main'
                  color='white'
                />
              </Link>

              <Box>
                <Link as={ReactRouterLink} to={"/u/1/ahmed"}>
                  <Heading size='sm'>{post.user.name}</Heading>
                </Link>
                <Text fontSize='xs'>
                  {post.date} @{" "}
                  <Link as={ReactRouterLink} to={"/c/" + post.community}>
                    {post.community}
                  </Link>{" "}
                </Text>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>

        <CardBody py={0} my={5}>
          <Heading size='md'>{post.title}</Heading>

          <HStack mt={5} spacing='24px' color='brand.main'>
            {post.tags.map((tag, i) => {
              return (
                <Text fontSize='md' key={i}>
                  <Link>#{tag}</Link>
                </Text>
              );
            })}
          </HStack>
        </CardBody>

        <Divider />

        <CardFooter py={2} pl={3}>
          <HStack spacing={5}>
            <HStack spacing={2}>
              <Tooltip label='Rate Up'>
                <IconButton
                  variant='ghost'
                  icon={<Icon as={MdOutlineThumbUp} boxSize={5} />}
                  color='lime'
                  _hover={{ textDecoration: "none" }}
                />
              </Tooltip>

              <Text>{post.counters.rate}</Text>

              <Tooltip label='Rate Down'>
                <IconButton
                  variant='ghost'
                  icon={<Icon as={MdOutlineThumbDown} boxSize={5} />}
                  color='blue'
                  _hover={{ textDecoration: "none" }}
                />
              </Tooltip>
            </HStack>

            <Tooltip label='Comments'>
              <Button
                variant='ghost'
                leftIcon={<Icon boxSize={5} as={MdChat} />}
                _hover={{ textDecoration: "none" }}
              >
                {post.counters.comments}
              </Button>
            </Tooltip>

            <Button
              variant='ghost'
              leftIcon={<Icon boxSize={5} as={MdOutlineShare} />}
              _hover={{ textDecoration: "none" }}
            >
              Share
            </Button>

            <Button
              variant='ghost'
              leftIcon={<Icon boxSize={5} as={MdOutlineErrorOutline} />}
              _hover={{ textDecoration: "none" }}
            >
              Report
            </Button>
          </HStack>
        </CardFooter>
      </Card>

      <Card ml={5} mb={5}>
        <CardBody fontSize='1.2rem'>
          <Text>{parse(post.body)}</Text>
        </CardBody>
      </Card>
    </>
  );
}
