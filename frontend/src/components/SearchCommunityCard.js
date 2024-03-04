import { Flex, Box, Card, Heading, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function SearchCommunityCard({ community }) {
  const { t } = useTranslation();

  return (
    <Card p={5} position='relative'>
      <Link reloadDocument
        _hover={{ textDecoration: "none" }}
        to={"/c/Cool_people"}
      >
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
          <Image
            boxSize={8}
            src={community.logo}
            fallbackSrc='/images/group-placeholder.png'
            alt='Community Logo'
          />

          <Box>
            <Heading size='sm'>{community.name}</Heading>
            <Text fontSize='xs'>{community.members} {t('members')} </Text>
          </Box>
        </Flex>
      </Link>
    </Card>
  );
}
