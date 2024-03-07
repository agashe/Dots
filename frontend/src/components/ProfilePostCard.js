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
  HStack,
  Stack,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  MdThumbsUpDown,
  MdChat,
  MdOutlineShare,
  MdEditSquare,
  MdDelete,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Confirm } from "./Confirm";
import { useState } from "react";
import axios from 'axios';

export function ProfilePostCard({ post }) {
  const [postId, setPostId] = useState('');
  const { t } = useTranslation();
  const toast = useToast();

  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();

  function goToPost() {
    window.location.href = '/p/' + post.id + '/' + post.title.replaceAll(' ', '+');
  }

  function handleDelete(event) {
    event.preventDefault();

    axios.post(process.env.REACT_APP_BACKEND_URL + "/posts/delete", {
      post_id: postId,
    })
      .then(function (response) {
        window.location.href = '/profile';
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
        src={post.banner}
        alt={post.title}
        fallbackSrc='images/placeholder-image.png'
        style={{ cursor: "pointer" }}
        onClick={goToPost}
      />

      <Stack w='100%'>
        <CardHeader py={0} pt={3}>
          <Link reloadDocument
            style={{ textAlign: "left" }}
            to={'/p/' + post.id + '/' + post.title.replaceAll(' ', '+')}
          >
            <Heading size='md'>{post.title}</Heading>
          </Link>
        </CardHeader>
        <CardBody py={0}>
          <Text fontSize='sm' my={1}>
            {post.date} @ <Link reloadDocument to={'/c/' + post.community.name.replaceAll(' ', '+')}>{post.community.name}</Link>{" "}
          </Text>

          <HStack spacing='24px' color='brand.main'>
            {post.tags.map((tag, i) => {
              return (
                <Text fontSize='md' key={i}>
                  <Link reloadDocument to={'/t/' + tag.replaceAll(' ', '+')}>#{tag}</Link>
                </Text>
              );
            })}
          </HStack>
        </CardBody>

        <CardFooter py={0} pb={2} px={{ base: 0, md: 5 }}>
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
      </Stack>

      <Tooltip label={t('actions.edit')}>
        <IconButton
          icon={<Icon as={MdEditSquare} />}
          position='absolute'
          top='7px'
          right='7px'
          colorScheme='brand'
          variant={{ base: 'solid', md: 'ghost' }}
          minWidth='10px'
          width={{ base: '30px', md: '10px' }}
          height={{ base: '30px', md: '10px' }}
          padding='0'
          as='a'
          href={'/edit-post/' + post.id}
        />
      </Tooltip>

      <Tooltip label={t('actions.delete')}>
        <IconButton
          icon={<Icon as={MdDelete} />}
          position='absolute'
          top='25px'
          right='7px'
          colorScheme='brand'
          variant={{ base: 'solid', md: 'ghost' }}
          minWidth='10px'
          width={{ base: '30px', md: '10px' }}
          height={{ base: '30px', md: '10px' }}
          padding='0'
          as='button'
          onClick={(e) => { onOpenConfirm(); setPostId(post.id); }}
        />
      </Tooltip>

      <Confirm
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        title={t('actions.delete_community')}
        handler={handleDelete}
      />
    </Card>
  );
}
