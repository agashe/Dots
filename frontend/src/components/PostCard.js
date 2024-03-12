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
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdThumbsUpDown, MdChat, MdOutlineShare } from "react-icons/md";
import { useTranslation } from "react-i18next";

export function PostCard({ post }) {
  const { t } = useTranslation();

  function goToPost() {
    window.location.href = '/p/'+ post.id + '/' + post.title.replaceAll(' ', '+');
  }

  return (
    <Card w={{ md: '100%', lg: '90%' }} mx='auto' mb={5}>
      <Image
        src={post.banner}
        alt={post.title}
        maxHeight={{ base: '300px', md: '400px' }}
        borderTopRadius='lg'
        fallbackSrc='/images/placeholder-image.png'
        style={{ cursor: "pointer" }}
        onClick={goToPost}
      />

      <CardHeader py={0} pt={3}>
        <Flex spacing='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Link reloadDocument to={'/u/' + post.user.id + '/' + post.user.name.replaceAll(' ', '+')}>
              <Avatar
                name={post.user.name}
                src={post.user.avatar}
                bg='brand.main'
                color='white'
              />
            </Link>

            <Box>
              <Link reloadDocument to={'/u/' + post.user.id + '/' + post.user.name.replaceAll(' ', '+')}>
                <Heading size='sm'>{post.user.name}</Heading>
              </Link>
              <Text fontSize='xs'>
                {post.created_at} @{" "}
                <Link reloadDocument to={'/c/' + post.community.name.replaceAll(' ', '+')}>
                  {post.community.name}
                  {post.community.is_closed ? " [" + t('statuses.closed_community') + "]" : ''}
                </Link>{" "}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody py={0} my={5}>
        <Link reloadDocument
          style={{ textAlign: "left" }}
          to={'/p/'+ post.id + '/' + post.title.replaceAll(' ', '+')}
        >
          <Heading size='md'>{post.title}</Heading>
        </Link>

        <HStack mt={5} spacing='24px' color='brand.main'>
          {post.tags.map((tag, i) => {
            return (
              <Text fontSize='md' key={i}>
                <Link reloadDocument to={'/t/' + tag.replaceAll(' ', '+')}>#{tag}</Link>
              </Text>
            );
          })}
        </HStack>
      </CardBody>

      <Divider />

      <CardFooter py={2} px={{ base: 0, md: 5 }}>
        <Flex w='100%'>
          <Link reloadDocument>
            <Tooltip label={t('actions.rate')}>
              <Button
                variant='ghost'
                leftIcon={<Icon as={MdThumbsUpDown} />}
                _hover={{ textDecoration: "none" }}
              >
                {post.rate}
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
                {post.comments_count}
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
