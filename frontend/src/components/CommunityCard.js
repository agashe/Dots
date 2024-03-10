import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  Image,
  Flex,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Confirm } from "./Confirm";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import axios from 'axios';

export function CommunityCard({ community }) {
  const [isMember, setIsMember] = useState(community.is_member);
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

  function communityAction(action) {
    axios.post(process.env.REACT_APP_BACKEND_URL + "/communities/" + action, {
      community_id: community.id,
    })
      .then(function (response) {
        window.location.reload();
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
    <Card mr={{ base: 0, lg: 5 }} mb={5}>
      <CardBody>
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
          <Image
            boxSize={10}
            src={community.logo}
            fallbackSrc='/images/group-placeholder.png'
            onClick={goToCommunity}
            alt='Community logo'
          />

          <Box>
            <Heading size='sm'>
              {community.name}
              {community.is_closed ? " [" + t('statuses.closed_community') + "]" : ''}
            </Heading>
            <Text fontSize='xs'>{community.members_count} {t('members')} </Text>
          </Box>
        </Flex>

        <Box my={5}>
          <Text fontSize='sm'>
            {community.description}
          </Text>
        </Box>

        {
          !community.is_closed &&
          <Box w='100%'>
            <Button w='100%' onClick={(e) => {
              !community.is_member ?
                communityAction('join') :
                onOpenConfirm();
            }
            }>
              {t('actions.' + (community.is_member ? 'leave' : 'join'))}
            </Button>
          </Box>
        }
      </CardBody>

      <Confirm
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        title={t('actions.leave')}
        label={t('actions.leave')}
        handler={(e) => {
          e.preventDefault();
          communityAction('leave');
        }}
      />
    </Card>
  );
}
