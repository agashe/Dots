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
  HStack,
  Tooltip,
  Spacer,
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
import { AddComment } from "./AddComment";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";

export function Comment({ comment }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [addComment, setAddComment] = useState(false);
  const { t } = useTranslation();

  console.log(user);

  function showAddComment() {
    setAddComment(!addComment);
  }

  return (
    <Card mb={5} mx={1}>
      <CardHeader py={0} pt={3} px={{ base: 1, md: 5 }}>
        <Flex>
          <Link reloadDocument to={'/u/' + comment.user.id + '/' + comment.user.name.replaceAll(' ', '+')}>
            <Avatar
              name={comment.user.name}
              src={comment.user.avatar}
              bg='brand.main'
              color='white'
              size='sm'
              mr={2}
            />
          </Link>

          <Box mt={1}>
            <Link reloadDocument to={'/u/' + comment.user.id + '/' + comment.user.name.replaceAll(' ', '+')}>
              <Heading size={{ base: 'xs', md: 'sm' }}>{comment.user.name}</Heading>
            </Link>
          </Box>

          <Spacer />

          <Text fontSize={{ base: 'xs', md: 'sm' }}>({comment.created_at})</Text>
        </Flex>
      </CardHeader>

      <CardBody py={0} my={2} px={{ base: 1, md: 5 }}>
        <Text>
          {
            comment.is_deleted ?
              "[" + t('statuses.deleted_comment') + "]" : parse(comment.text)
          }
        </Text>
      </CardBody>

      <CardFooter py={2} pl='10px'>
        <HStack spacing={2}>
          <HStack spacing={2}>
            <Tooltip label='Rate Up'>
              <IconButton
                variant='ghost'
                icon={<Icon as={MdOutlineThumbUp} />}
                boxSize={4}
                color='lime'
                _hover={{ textDecoration: "none" }}
                w={{ base: 5, md: 10 }}
                minW={{ base: 5, md: 10 }}
              />
            </Tooltip>

            <Text>{comment.rate}</Text>

            <Tooltip label='Rate Down'>
              <IconButton
                variant='ghost'
                icon={<Icon as={MdOutlineThumbDown} />}
                boxSize={4}
                color='blue'
                _hover={{ textDecoration: "none" }}
                w={{ base: 5, md: 10 }}
                minW={{ base: 5, md: 10 }}
              />
            </Tooltip>
          </HStack>

          <Tooltip label='Comment'>
            <IconButton
              variant='ghost'
              boxSize={4}
              icon={<Icon as={MdChat} />}
              _hover={{ textDecoration: "none" }}
              onClick={showAddComment}
            />
          </Tooltip>

          <Hide below='md'>
            <Tooltip label='Share'>
              <IconButton
                variant='ghost'
                boxSize={4}
                icon={<Icon as={MdOutlineShare} />}
                _hover={{ textDecoration: "none" }}
              />
            </Tooltip>

            <Tooltip label='Report'>
              <IconButton
                variant='ghost'
                boxSize={4}
                icon={<Icon as={MdOutlineErrorOutline} />}
                _hover={{ textDecoration: "none" }}
              />
            </Tooltip>
          </Hide>

          <Show below='md'>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<Icon boxSize={5} as={MdMoreHoriz} />}
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

      {addComment && (
        <Box mr={5}>
          <AddComment postId={1} />
        </Box>
      )}

      <Box mx={{ base: 1, md: 5 }}>
        {comment.sub_comments.length
          ? comment.sub_comments.map((comment, i) => {
            return <Comment comment={comment} key={i} />;
          })
          : ""}
      </Box>
    </Card>
  );
}
