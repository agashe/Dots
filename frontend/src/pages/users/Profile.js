import {
  Flex,
  Card,
  CardBody,
  Heading,
  CardHeader,
  Text,
  Spacer,
  Avatar,
  Icon,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { Footer } from "../../components/Footer";
import { MdCake, MdMap, MdCardMembership } from "react-icons/md";
import { ProfilePostCard } from "../../components/ProfilePostCard";
import { ProfileCommunityCard } from "../../components/ProfileCommunityCard";
import { ProfileCommentCard } from "../../components/ProfileCommentCard";
import { useTranslation } from "react-i18next";
import { Pagination } from "../../components/Pagination";
import { useState, useEffect } from "react";
import { SEO } from "../../components/SEO";
import axios from 'axios';

export function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userProfile, setUserProfile] = useState({});
  const { t } = useTranslation();
  const toast = useToast();

  useEffect(function () {
    window.scrollTo(0, 0);

    axios.get('/users/profile')
      .then(function (response) {
        setUserProfile(response.data.data);
      })
      .catch(function (error) {
        toast({
          title: t('errors.server_error'),
          status: 'error',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
      });
  }, []);

  // pagination
  const [postsPages, setPostsPages] = useState(1);
  const [currentPostsPage, setCurrentPostsPage] = useState(1);
  const [commentsPages, setCommentsPages] = useState(1);
  const [currentCommentsPage, setCurrentCommentsPage] = useState(1);
  const [communitiesPages, setCommunitiesPages] = useState(1);
  const [currentCommunitiesPage, setCurrentCommunitiesPage] = useState(1);

  return (
    <>
      <SEO info={{ title: t('profile') }} />
      <Flex pt={5} px={{ base: 5, lg: 10 }} minHeight='100vh' flexDirection='column'>
        <Card
          w={{ base: '100%', lg: '70%' }}
          mx='auto'
          mb={5}
          justifyContent='center'
          alignItems='center'
          textAlign='center'
        >
          <CardHeader py={0} pt={3}>
            <Avatar
              name={userProfile.user != undefined ? userProfile.user.name : ''}
              src={userProfile.user != undefined ? userProfile.user.avatar : ''}
              bg='brand.main'
              color='white'
              size={{ base: 'lg', lg: 'xl' }}
            />
            <Heading my={3}>{userProfile.user != undefined ? userProfile.user.name : ''}</Heading>
            <Text fontSize={24}>{userProfile.user != undefined ? userProfile.user.bio : ''}</Text>
          </CardHeader>

          <CardBody py={0} my={5}>
            <Stack spacing={{ base: 3, lg: 8 }} direction={{ base: 'column', lg: 'row' }}>
              <Text>
                <Icon as={MdCake} mr={2} />
                {userProfile.user != undefined ? userProfile.user.birth_date : ''}
              </Text>

              <Text>
                <Icon as={MdMap} mr={2} />
                {userProfile.user != undefined ? userProfile.user.location : ''}
              </Text>

              <Text>
                <Icon as={MdCardMembership} mr={2} />
                {userProfile.user != undefined ? userProfile.user.work : ''}
              </Text>
            </Stack>
          </CardBody>
        </Card>

        <Card w={{ base: '100%', lg: '70%' }} mx='auto' mb={5}>
          <CardBody py={0} mt={5} px={{ base: 2, lg: 5 }}>
            <Tabs colorScheme='brand'>
              <TabList overflowX={{ base: 'scroll', md: 'visible' }} overflowY={{ base: 'visible', md: 'visible' }}>
                <Tab>
                  {t('posts')}
                  <Badge ml={2} borderRadius='lg' bg='gray' color='white'>
                    {userProfile.posts ? userProfile.posts.length : 0}
                  </Badge>
                </Tab>
                <Tab>
                  {t('comments')}
                  <Badge ml={2} borderRadius='lg' bg='gray' color='white'>
                    {userProfile.comments ? userProfile.comments.length : 0}
                  </Badge>
                </Tab>
                <Tab>
                  {t('communities')}
                  <Badge ml={2} borderRadius='lg' bg='gray' color='white'>
                    {userProfile.communities ? userProfile.communities.length : 0}
                  </Badge>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  {userProfile.posts ? (
                    <>
                      <SimpleGrid columns={1} spacing={5}>
                        {userProfile.posts.map((post, i) => {
                          return <ProfilePostCard post={post} key={i} />;
                        })}
                      </SimpleGrid>
                      {
                        (postsPages !== 1) &&
                        <Pagination
                          prevDisabled={(currentPostsPage === 1)}
                          nextDisabled={(currentPostsPage === postsPages)}
                          handlePrev={() => { setCurrentPostsPage(currentPostsPage - 1) }}
                          handleNext={() => { setCurrentPostsPage(currentPostsPage + 1) }}
                        />
                      }
                    </>
                  ) : (
                    <Heading textAlign='center' size='md' p={5} pb={0}>
                      {t('errors.account_has_no_items', { items: 'posts' })}
                    </Heading>
                  )}
                </TabPanel>

                <TabPanel>
                  {userProfile.comments ? (
                    <>
                      <Stack spacing={5}>
                        {userProfile.comments.map((comment, i) => {
                          return <ProfileCommentCard comment={comment} key={i} />;
                        })}
                      </Stack>
                      {
                        (commentsPages !== 1) &&
                        <Pagination
                          prevDisabled={(currentCommentsPage === 1)}
                          nextDisabled={(currentCommentsPage === commentsPages)}
                          handlePrev={() => { setCurrentCommentsPage(currentCommentsPage - 1) }}
                          handleNext={() => { setCurrentCommentsPage(currentCommentsPage + 1) }}
                        />
                      }
                    </>
                  ) : (
                    <Heading textAlign='center' size='md' p={5} pb={0}>
                      {t('errors.account_has_no_items', { items: 'comments' })}
                    </Heading>
                  )}
                </TabPanel>

                <TabPanel>
                  {userProfile.communities ? (
                    <>
                      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 5, lg: 10 }}>
                        {userProfile.communities.map((community, i) => {
                          return (
                            <ProfileCommunityCard community={community} key={i} />
                          );
                        })}
                      </SimpleGrid>
                      {
                        (communitiesPages !== 1) &&
                        <Pagination
                          prevDisabled={(currentCommunitiesPage === 1)}
                          nextDisabled={(currentCommunitiesPage === communitiesPages)}
                          handlePrev={() => { setCurrentCommunitiesPage(currentCommunitiesPage - 1) }}
                          handleNext={() => { setCurrentCommunitiesPage(currentCommunitiesPage + 1) }}
                        />
                      }
                    </>
                  ) : (
                    <Heading textAlign='center' size='md' p={5} pb={0}>
                      {t('errors.account_has_no_items', { items: 'communities' })}
                    </Heading>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>

        <Spacer />

        <Footer />
      </Flex>
    </>
  );
}
