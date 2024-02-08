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
} from "@chakra-ui/react";
import { Footer } from "../../components/Footer";
import { MdCake, MdMap, MdCardMembership } from "react-icons/md";
import { ProfilePostCard } from "../../components/ProfilePostCard";
import { ProfileCommunityCard } from "../../components/ProfileCommunityCard";
import { ProfileCommentCard } from "../../components/ProfileCommentCard";
import { useTranslation } from "react-i18next";
import { Pagination } from "../../components/Pagination";
import { useState } from "react";
import { SEO } from "../../components/SEO";

export function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { t } = useTranslation();

  const posts = [
    {
      title: "Lorem ipsum dolor sit amet",
      image: "https://w.wallhaven.cc/full/jx/wallhaven-jxyopy.png",
      community: "All stars",
      date: "15 Mar 2021",
      tags: ["Place", "Music"],
      counters: {
        rate: 777,
        comments: 200,
      },
      user: {
        name: "Ahmed Omar",
        avatar: "",
      },
    },
    {
      title: `Aqua `,
      image:
        "https://w0.peakpx.com/wallpaper/671/487/HD-wallpaper-aqua-anime-azul-kawaii-konosuba.jpg",
      community: "Anime World",
      date: "12 Dec 2023",
      tags: ["Anime"],
      counters: {
        rate: 300,
        comments: 30,
      },
      user: {
        name: "Ali Shadi",
        avatar: "",
      },
    },
    {
      title: `Megumin ...`,
      image:
        "https://thicc-af.mywaifulist.moe/waifus/megumin-konosuba-god-s-blessing-on-this-wonderful-world/Ts2151UN1dnhE1gYDCjLdMg0gBZ8SADzIcgLWgV2_thumbnail.jpg",
      community: "Anime World",
      date: "12 Dec 2023",
      tags: ["Anime"],
      counters: {
        rate: 300,
        comments: 30,
      },
      user: {
        name: "Hessan Al Said",
        avatar:
          "https://i.pinimg.com/736x/8e/6d/89/8e6d8909b822dc22b8488c6f5fe471d4.jpg",
      },
    },
    {
      title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis. 
        Duis euismod neque ac convallis molestie`,
      image: "",
      community: "Cool_people",
      date: "17 Jan",
      tags: ["Cars", "Science", "Tech"],
      counters: {
        rate: 5000,
        comments: 5000,
      },
      user: {
        name: "Segun Adebayo",
        avatar: "https://bit.ly/sage-adebayo",
      },
    },
  ];

  const comments = [
    {
      title: "Lorem ipsum dolor sit amet",
      comment: "Lorem ipsum ...",
      date: "7 Feb 2022",
    },
    {
      title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis. 
        Duis euismod neque ac convallis molestie`,
      comment: "Suspendisse venenatis imperdiet lobortis ...",
      date: "24 May 2020",
    },
  ];

  const communities = [
    {
      name: "The Unknown",
      members: "2",
      logo: "unknown.png",
    },
    {
      name: "Cool_people",
      members: "10.2M",
      logo: "images/sun-icon.png",
    },
  ];

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
      <Flex pt={5} px={{ base: 5, lg: 10 }} bg='gray.50' minHeight='100vh' flexDirection='column'>
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
              name={user.name}
              src={user.avatar}
              bg='brand.main'
              color='white'
              size={{ base: 'lg', lg: 'xl' }}
            />
            <Heading my={3}>{user.name}</Heading>
            <Text>I am a cool guy , who likes build stuff with assembly :)</Text>
          </CardHeader>

          <CardBody py={0} my={5}>
            <Stack spacing={{ base: 3, lg: 8 }} direction={{ base: 'column', lg: 'row' }}>
              <Text>
                <Icon as={MdCake} mr={2} />
                30 Oct 1999
              </Text>

              <Text>
                <Icon as={MdMap} mr={2} />
                Zolo Lolo , Kal-Mangaro Islands
              </Text>

              <Text>
                <Icon as={MdCardMembership} mr={2} />
                Freelancer
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
                    {posts.length}
                  </Badge>
                </Tab>
                <Tab>
                  {t('comments')}
                  <Badge ml={2} borderRadius='lg' bg='gray' color='white'>
                    {comments.length}
                  </Badge>
                </Tab>
                <Tab>
                  {t('communities')}
                  <Badge ml={2} borderRadius='lg' bg='gray' color='white'>
                    {communities.length}
                  </Badge>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  {posts.length ? (
                    <>
                      <SimpleGrid columns={1} spacing={5}>
                        {posts.map((post, i) => {
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
                      {t('account_has_no_items', { items: 'posts' })}
                    </Heading>
                  )}
                </TabPanel>

                <TabPanel>
                  {comments.length ? (
                    <>
                      <Stack spacing={5}>
                        {comments.map((comment, i) => {
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
                      {t('account_has_no_items', { items: 'comments' })}
                    </Heading>
                  )}
                </TabPanel>

                <TabPanel>
                  {communities.length ? (
                    <>
                      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 5, lg: 10 }}>
                        {communities.map((community, i) => {
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
                      {t('account_has_no_items', { items: 'communities' })}
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
