import {
  Box,
  Heading,
  Text,
  Tooltip,
  Icon,
  IconButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Confirm } from "./Confirm";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

export function ProfileCommentCard({ comment }) {
  const [commentId, setCommentId] = useState('');
  const { t } = useTranslation();
  const toast = useToast();

  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();

  function handleDelete(event) {
    event.preventDefault();

    axios.post(process.env.REACT_APP_BACKEND_URL + "/comments/delete", {
      comment_id: commentId,
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
    <>
      <Box p={3} shadow='md' borderWidth='1px' position='relative'>
        {/* <Heading fontSize='xl'>{comment.title}</Heading> */}
        <Link reloadDocument _hover={{ textDecoration: "none" }}>
          <Text fontSize='md' my={1}>
            {comment.text}
          </Text>
        </Link>
        <Text fontSize='sm' mt={5}>
          {comment.created_at}
        </Text>
        <Tooltip label={t('actions.delete')}>
          <IconButton
            icon={<Icon as={MdDelete} />}
            position='absolute'
            top='7px'
            right='7px'
            colorScheme='brand'
            variant={{ base: 'solid', md: 'ghost' }}
            minWidth='10px'
            width={{ base: '30px', md: '10px' }}
            height={{ base: '30px', md: '10px' }}
            padding='0'
            as='button'
            onClick={(e) => { onOpenConfirm();setCommentId(comment.id); }}
          />
        </Tooltip>
      </Box>

      <Confirm
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        title={t('actions.delete_comment')}
        handler={handleDelete}
      />
    </>
  );
}
