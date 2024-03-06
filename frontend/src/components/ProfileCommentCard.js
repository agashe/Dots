import {
  Box,
  Heading,
  Text,
  Tooltip,
  Icon,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Confirm } from "./Confirm";
import { Link } from "react-router-dom";

export function ProfileCommentCard({ comment }) {
  const { t } = useTranslation();

  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();

  function handleDelete() {
    //
  }

  return (
    <Link reloadDocument _hover={{ textDecoration: "none" }} position='relative'>
      <Box p={3} shadow='md' borderWidth='1px'>
        {/* <Heading fontSize='xl'>{comment.title}</Heading> */}
        <Text fontSize='md' my={1}>
          {comment.text}
        </Text>
        <Text fontSize='sm' mt={5}>
          {comment.created_at}
        </Text>
      </Box>
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
          onClick={onOpenConfirm}
        />
      </Tooltip>
      <Confirm
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        title={t('actions.delete_comment')}
        handler={handleDelete}
      />
    </Link>
  );
}
