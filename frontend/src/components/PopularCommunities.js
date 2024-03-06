import {
  Box,
  Card,
  CardBody,
  Heading,
  CardHeader,
  Stack,
  StackDivider,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function PopularCommunities({ communities }) {
  const { t } = useTranslation();

  return (
    <Card mr={5}>
      <CardHeader pb={0}>
        <Heading size='md'>{t('popular_communities')}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          {
            communities.map(function (community) {
              return (
                <Link reloadDocument
                  style={{ textDecoration: "none" }}
                  to={"/c/" + community.name.replaceAll(' ', '+')}
                  key={community.id}
                >
                  <Box>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                      <Image
                        boxSize={8}
                        src={community.logo}
                        fallbackSrc='/images/group-placeholder.png'
                        alt='Community Logo'
                      />

                      <Box>
                        <Heading size='sm'>{community.name}</Heading>
                        <Text fontSize='xs'>
                          {community.members_count} {t('members')}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                </Link>
              );
            })
          }
        </Stack>
      </CardBody>
    </Card>
  );
}
