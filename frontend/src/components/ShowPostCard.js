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
  HStack,
  Tooltip,
  Show,
  Hide,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  // MdThumbUp,
  // MdThumbDown,
  MdOutlineThumbUp,
  MdOutlineThumbDown,
  MdChat,
  MdOutlineShare,
  MdOutlineErrorOutline,
  MdMoreHoriz,
} from "react-icons/md";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";

export function ShowPostCard({ post }) {
  const { t } = useTranslation();

  return (
    <>
      <Card ml={{ base: 0, lg: 5 }} mb={5}>
        <Image
          src={post.banner}
          alt={post.title}
          maxHeight='500px'
          borderTopRadius='lg'
          fallbackSrc='/images/placeholder-image.png'
          style={{ cursor: "pointer" }}
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
                  <Link reloadDocument>#{tag}</Link>
                </Text>
              );
            })}
          </HStack>
        </CardBody>

        <Divider />

        <CardFooter py={2} pl={3}>
          <HStack spacing={{ base: 1, md: 5 }}>
            <HStack spacing={{ base: 1, md: 2 }}>
              <Tooltip label={t('actions.rate_up')}>
                <IconButton
                  variant='ghost'
                  icon={<Icon as={MdOutlineThumbUp} boxSize={5} />}
                  color='lime'
                  _hover={{ textDecoration: "none" }}
                />
              </Tooltip>

              <Text>{post.rate}</Text>

              <Tooltip label={t('actions.rate_down')}>
                <IconButton
                  variant='ghost'
                  icon={<Icon as={MdOutlineThumbDown} boxSize={5} />}
                  color='blue'
                  _hover={{ textDecoration: "none" }}
                />
              </Tooltip>
            </HStack>

            <Tooltip label={t('comments')}>
              <Button
                variant='ghost'
                leftIcon={<Icon boxSize={5} as={MdChat} />}
                _hover={{ textDecoration: "none" }}
              >
                {post.comments_count}
              </Button>
            </Tooltip>

            <Hide below='md'>
              <Button
                variant='ghost'
                leftIcon={<Icon boxSize={5} as={MdOutlineShare} />}
                _hover={{ textDecoration: "none" }}
              >
                {t('actions.share')}
              </Button>

              <Button
                variant='ghost'
                leftIcon={<Icon boxSize={5} as={MdOutlineErrorOutline} />}
                _hover={{ textDecoration: "none" }}
              >
                {t('actions.report')}
              </Button>
            </Hide>

            <Show below='md'>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label='Options'
                  icon={<Icon boxSize={7} as={MdMoreHoriz} />}
                  variant='ghost'
                />
                <MenuList>
                  <MenuItem icon={<Icon boxSize={5} as={MdOutlineShare} />}>
                    {t('actions.share')}
                  </MenuItem>
                  <MenuItem icon={<Icon boxSize={5} as={MdOutlineErrorOutline} />}>
                    {t('actions.report')}
                  </MenuItem>
                </MenuList>
              </Menu>
            </Show>
          </HStack>
        </CardFooter>
      </Card>

      <Card ml={{ base: 0, lg: 5 }} mb={5}>
        <CardBody fontSize={{ base: '1rem', lg: '1.2rem' }}>
          <Text>{parse(post.text)}</Text>
        </CardBody>
      </Card>
    </>
  );
}
