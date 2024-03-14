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
  useToast,
} from "@chakra-ui/react";
import {
  MdThumbUp,
  MdThumbDown,
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
import { useState } from "react";
import axios from 'axios';

export function ShowPostCard({ post }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [postRate, setPostRate] = useState(post.rate);
  const { t } = useTranslation();
  const toast = useToast();

  const [rateUp, setRateUp] = useState(
    post.user_rate == 1 ?
      <Icon as={MdThumbUp} boxSize={5} />
      :
      <Icon as={MdOutlineThumbUp} boxSize={5} />
  );

  const [rateDown, setRateDown] = useState(
    post.user_rate == -1 ?
      <Icon as={MdThumbDown} boxSize={5} />
      :
      <Icon as={MdOutlineThumbDown} boxSize={5} />
  );

  function rate(type) {
    if (!user) {
      toast({
        title: t('errors.sign_in_please', {action: t('actions.rate')}),
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });

      return;
    }

    axios.post("/posts/rate", {
      post_id: post.id,
      value: type == 'up' ? 1 : -1,
    })
      .then(function (response) {
        setPostRate(response.data.data.post_rate);

        if (response.data.data.user_rate == 1) {
          setRateUp(<Icon as={MdThumbUp} boxSize={5} />);
        }
        else if (response.data.data.user_rate == -1) {
          setRateDown(<Icon as={MdThumbDown} boxSize={5} />);
        }
      })
      .catch(function (error) {
        toast({
          title: error.response.data.message,
          status: 'error',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
      });
  }

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
                    {post.community.is_closed ? " [" + t('statuses.closed_community') + "]" : ''}
                  </Link>{" "}
                </Text>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>

        <CardBody py={0} my={5}>
          <Heading size='md'>{post.title}</Heading>

          <HStack mt={5} spacing={5} color='brand.main' wrap='wrap'>
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
                  icon={rateUp}
                  color='lime'
                  _hover={{ textDecoration: "none" }}
                  onClick={(e) => { rate('up') }}
                />
              </Tooltip>

              <Text>{postRate}</Text>

              <Tooltip label={t('actions.rate_down')}>
                <IconButton
                  variant='ghost'
                  icon={rateDown}
                  color='blue'
                  _hover={{ textDecoration: "none" }}
                  onClick={(e) => { rate('down') }}
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
