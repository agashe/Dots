import {
  Box,
  Card,
  CardBody,
  Heading,
  CardHeader,
  Stack,
  StackDivider,
  Link,
  Flex,
  Spacer,
  Tooltip,
  Button,
  Icon,
} from "@chakra-ui/react";
import { MdThumbsUpDown, MdChat, MdOutlineShare } from "react-icons/md";
import { Link as ReactRouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function LatestPosts() {
  const { t } = useTranslation();

  return (
    <Card mb={5} mr={5}>
      <CardHeader pb={0}>
        <Heading size='md'>{t('top_now')}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Link reloadDocument
            _hover={{ textDecoration: "none" }}
            as={ReactRouterLink}
            to={"/p/1/ahmed"}
          >
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent et neque lectus. Suspendisse venenatis imperdiet
                lobortis. Duis euismod neque ac convallis molestie
              </Heading>

              <Flex w='100%'>
                <Tooltip label={t('actions.rate')}>
                  <Button
                    variant='ghost'
                    leftIcon={<Icon as={MdThumbsUpDown} />}
                  >
                    5000
                  </Button>
                </Tooltip>

                <Spacer />

                <Tooltip label={t('comments')}>
                  <Button variant='ghost' leftIcon={<Icon as={MdChat} />}>
                    5000
                  </Button>
                </Tooltip>

                <Spacer />

                <Button variant='ghost' leftIcon={<Icon as={MdOutlineShare} />}>
                  {t('actions.share')}
                </Button>
              </Flex>
            </Box>
          </Link>

          <Link reloadDocument _hover={{ textDecoration: "none" }}>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent et neque lectus. Suspendisse venenatis imperdiet
                lobortis. Duis euismod neque ac convallis molestie
              </Heading>

              <Flex w='100%'>
                <Tooltip label={t('actions.rate')}>
                  <Button
                    variant='ghost'
                    leftIcon={<Icon as={MdThumbsUpDown} />}
                  >
                    5000
                  </Button>
                </Tooltip>

                <Spacer />

                <Tooltip label={t('comments')}>
                  <Button variant='ghost' leftIcon={<Icon as={MdChat} />}>
                    5000
                  </Button>
                </Tooltip>

                <Spacer />

                <Button variant='ghost' leftIcon={<Icon as={MdOutlineShare} />}>
                  {t('actions.share')}
                </Button>
              </Flex>
            </Box>
          </Link>

          <Link reloadDocument _hover={{ textDecoration: "none" }}>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent et neque lectus. Suspendisse venenatis imperdiet
                lobortis. Duis euismod neque ac convallis molestie
              </Heading>

              <Flex w='100%'>
                <Tooltip label={t('actions.rate')}>
                  <Button
                    variant='ghost'
                    leftIcon={<Icon as={MdThumbsUpDown} />}
                  >
                    5000
                  </Button>
                </Tooltip>

                <Spacer />

                <Tooltip label={t('comments')}>
                  <Button variant='ghost' leftIcon={<Icon as={MdChat} />}>
                    5000
                  </Button>
                </Tooltip>

                <Spacer />

                <Button variant='ghost' leftIcon={<Icon as={MdOutlineShare} />}>
                  {t('actions.share')}
                </Button>
              </Flex>
            </Box>
          </Link>
        </Stack>
      </CardBody>
    </Card>
  );
}
