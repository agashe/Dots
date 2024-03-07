import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  Image,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export function CommunityCard({ community }) {
  const { t } = useTranslation();

  function goToCommunity() {
    window.location.href = '/c/' + community.name.replaceAll(' ', '+');
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

        <Box w='100%'>
          <Button w='100%'>{t('actions.join')}</Button>
        </Box>
      </CardBody>
    </Card>
  );
}
