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
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { MdThumbsUpDown, MdChat, MdOutlineShare } from "react-icons/md";
import { useTranslation } from "react-i18next";

export function PostCard({ post }) {
  const { t } = useTranslation();

  function goToPost() {
    window.location.href = '/p/1/ahmed';
  }

  return (
    <Card w='90%' mx='auto' mb={5}>
      <Image
        src={post.image}
        alt={post.title}
        maxHeight='400px'
        borderTopRadius='lg'
        fallbackSrc='/images/placeholder-image.png'
        style={{ cursor: "pointer" }}
        onClick={goToPost}
      />

      <CardHeader py={0} pt={3}>
        <Flex spacing='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Link reloadDocument as={ReactRouterLink} to={"/u/1/ahmed"}>
              <Avatar
                name={post.user.name}
                src={post.user.avatar}
                bg='brand.main'
                color='white'
              />
            </Link>

            <Box>
              <Link reloadDocument as={ReactRouterLink} to={"/u/1/ahmed"}>
                <Heading size='sm'>{post.user.name}</Heading>
              </Link>
              <Text fontSize='xs'>
                {post.date} @{" "}
                <Link reloadDocument as={ReactRouterLink} to={"/c/" + post.community}>
                  {post.community}
                </Link>{" "}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody py={0} my={5}>
        <Link reloadDocument
          style={{ textAlign: "left" }}
          as={ReactRouterLink}
          to={"/p/1/ahmed"}
        >
          <Heading size='md'>{post.title}</Heading>
        </Link>

        <HStack mt={5} spacing='24px' color='brand.main'>
          {post.tags.map((tag, i) => {
            return (
              <Text fontSize='md' key={i}>
                <Link reloadDocument as={ReactRouterLink} to={"/t/" + tag}>#{tag}</Link>
              </Text>
            );
          })}
        </HStack>
      </CardBody>

      <Divider />

      <CardFooter py={2}>
        <Flex w='100%'>
          <Link reloadDocument>
            <Tooltip label={t('actions.rate')}>
              <Button
                variant='ghost'
                leftIcon={<Icon as={MdThumbsUpDown} />}
                _hover={{ textDecoration: "none" }}
              >
                {post.counters.rate}
              </Button>
            </Tooltip>
          </Link>

          <Spacer />

          <Link reloadDocument>
            <Tooltip label={t('comments')}>
              <Button
                variant='ghost'
                leftIcon={<Icon as={MdChat} />}
                _hover={{ textDecoration: "none" }}
              >
                {post.counters.comments}
              </Button>
            </Tooltip>
          </Link>

          <Spacer />

          <Button
            variant='ghost'
            leftIcon={<Icon as={MdOutlineShare} />}
            _hover={{ textDecoration: "none" }}
          >
            {t('actions.share')}
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
}
