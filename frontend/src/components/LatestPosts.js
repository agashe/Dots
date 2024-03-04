import {
  Box,
  Card,
  CardBody,
  Heading,
  CardHeader,
  Stack,
  StackDivider,
  Flex,
  Spacer,
  Tooltip,
  Button,
  Icon,
} from "@chakra-ui/react";
import { MdThumbsUpDown, MdChat, MdOutlineShare } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function LatestPosts({ posts }) {
  const { t } = useTranslation();

  return (
    <Card mb={5} mr={5}>
      <CardHeader pb={0}>
        <Heading size='md'>{t('top_now')}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          {
            posts.map(function (post) {
              return (
                <Link reloadDocument to={"/p/" + post.id + "/" + post.title}>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      {post.title}
                    </Heading>

                    <Flex w='100%'>
                      <Tooltip label={t('actions.rate')}>
                        <Button
                          variant='ghost'
                          leftIcon={<Icon as={MdThumbsUpDown} />}
                        >
                          {post.rate}
                        </Button>
                      </Tooltip>

                      <Spacer />

                      <Tooltip label={t('comments')}>
                        <Button variant='ghost' leftIcon={<Icon as={MdChat} />}>
                          {post.comments_count}
                        </Button>
                      </Tooltip>

                      <Spacer />

                      <Button variant='ghost' leftIcon={<Icon as={MdOutlineShare} />}>
                        {t('actions.share')}
                      </Button>
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
