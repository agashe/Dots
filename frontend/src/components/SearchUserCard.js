import { Flex, Box, Card, Heading, Text, Link, Avatar } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function SearchUserCard({ user }) {
  const { t } = useTranslation();

  return (
    <Card p={5} position='relative'>
      <Link reloadDocument
        _hover={{ textDecoration: "none" }}
        as={ReactRouterLink}
        to={"/u/1/ahmed"}
      >
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
          <Avatar
            name={user.name}
            src={user.avatar}
            bg='brand.main'
            color='white'
          />

          <Box>
            <Heading size='sm'>{user.name}</Heading>
            <Text fontSize='xs'>{user.posts} {t('posts')} </Text>
          </Box>
        </Flex>
      </Link>
    </Card>
  );
}
