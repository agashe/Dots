import {
  Flex,
  Box,
  Card,
  Heading,
  Text,
  Image,
  Icon,
  IconButton,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { MdEditSquare, MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Confirm } from "./Confirm";
import { useState } from "react";
import axios from 'axios';

export function ProfileCommunityCard({ community }) {
  const [communityId, setCommunityId] = useState('');
  const { t } = useTranslation();
  const toast = useToast();

  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();

  function goToCommunity() {
    window.location.href = '/c/' + community.name.replaceAll(' ', '+');
  }

  function handleDelete(el) {
    el.preventDefault();

    axios.delete("/communities/delete", {
      params: {
        community_id: communityId,
      }
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
    <Card p={5} position='relative'>
      <Link reloadDocument _hover={{ textDecoration: "none" }}>
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
          <Image
            boxSize={8}
            src={community.logo}
            fallbackSrc='/images/group-placeholder.png'
            onClick={goToCommunity}
            alt='Community Logo'
          />

          <Box>
            <Link reloadDocument to={'/c/' + community.name.replaceAll(' ', '+')}>
              <Heading size='sm'>
                {community.name}
                {community.is_closed ? " [" + t('statuses.closed_community') + "]" : ''}
              </Heading>
              <Text fontSize='xs'>{community.members_count} {t('members')} </Text>
            </Link>
          </Box>
        </Flex>
      </Link>

      {
        community.is_closed ? '' : <>
          <Tooltip label={t('actions.edit')}>
            <IconButton
              as='a'
              href={'/edit-community/' + community.name.replaceAll(' ', '+')}
              icon={<Icon as={MdEditSquare} />}
              position='absolute'
              top='7px'
              right='7px'
              colorScheme='brand'
              variant='ghost'
              minWidth='10px'
              width='10px'
              height='10px'
              padding='0'
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
              onClick={(e) => { onOpenConfirm(); setCommunityId(community.id); }}
            />
          </Tooltip>
        </>
      }

      <Confirm
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        title={t('actions.delete_community')}
        label={t('actions.delete')}
        handler={handleDelete}
      />
    </Card>
  );
}
