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
} from "@chakra-ui/react";
import {
  MdThumbsUpDown,
  MdChat,
  MdOutlineShare,
  MdEditSquare,
} from "react-icons/md";
import { Link as ReactRouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function ProfilePostCard({ post }) {
  const { t } = useTranslation();

  function goToPost() {
    window.location.href = '/p/1/ahmed'; // `p/${post.id}/${post.title}`
  }

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      position='relative'
      overflow='hidden'
      variant='outline'
      h={{ base: '100%', sm: '250px', lg: '200px' }}
    >
      <Image
        objectFit='cover'
        w={{ base: '100%', sm: '250px', lg: '200px' }}
        h='auto'
        minW={{ base: '100%', sm: '250px', lg: '200px' }}
        maxW={{ sm: '250px', lg: '200px' }}
        maxH={{ base: '150px', sm: '250px', lg: '200px' }}
        src={post.image}
        alt={post.title}
        fallbackSrc='images/placeholder-image.png'
        style={{ cursor: "pointer" }}
        onClick={goToPost}
      />

      <Stack w='100%'>
        <CardHeader py={0} pt={3}>
          <Link reloadDocument
            style={{ textAlign: "left" }}
            as={ReactRouterLink}
            to={"/p/1/ahmed"}
          >
            <Heading size='md'>{post.title}</Heading>
          </Link>
        </CardHeader>
        <CardBody py={0}>
          <Text fontSize='sm' my={1}>
            {post.date} @ <Link reloadDocument as={ReactRouterLink} to={"/c/" + post.community}>{post.community}</Link>{" "}
          </Text>

          <HStack spacing='24px' color='brand.main'>
            {post.tags.map((tag, i) => {
              return (
                <Text fontSize='md' key={i}>
                  <Link reloadDocument as={ReactRouterLink} to={"/t/" + tag}>#{tag}</Link>
                </Text>
              );
            })}
          </HStack>
        </CardBody>

        <CardFooter py={0} pb={2} px={{base: 0, md: 5}}>
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
      </Stack>

      <Tooltip label={t('actions.edit')}>
        <IconButton
          icon={<Icon as={MdEditSquare} />}
          position='absolute'
          top='7px'
          right='7px'
          color='brand.main'
          variant={{ base: 'solid', md: 'ghost' }}
          minWidth='10px'
          width={{ base: '30px', md: '10px' }}
          height={{ base: '30px', md: '10px' }}
          padding='0'
          as='a'
          href='/edit-post'
        />
      </Tooltip>
    </Card>
  );
}
