import {
  Flex,
  Box,
  Card,
  Heading,
  Text,
  Image,
  Link,
  Icon,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { MdEditSquare } from "react-icons/md";
import { useTranslation } from "react-i18next";

export function ProfileCommunityCard({ community }) {
  const { t } = useTranslation();

  return (
    <Card p={5} position='relative'>
      <Link _hover={{ textDecoration: "none" }}>
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
          <Image
            boxSize={8}
            src={community.logo}
            fallbackSrc='/images/group-placeholder.png'
          />

          <Box>
            <Heading size='sm'>{community.name}</Heading>
            <Text fontSize='xs'>{community.members} {t('members')} </Text>
          </Box>
        </Flex>
      </Link>

      <Tooltip label={t('actions.edit')}>
        <IconButton
          as='a'
          href='/edit-community'
          icon={<Icon as={MdEditSquare} />}
          position='absolute'
          top='7px'
          right='7px'
          color='brand.main'
          variant='ghost'
          minWidth='10px'
          width='10px'
          height='10px'
          padding='0'
        />
      </Tooltip>
    </Card>
  );
}
