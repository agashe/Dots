import {
  Flex,
  Button,
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

  return (
    <Flex pt={5} px={10} bg='gray.50' minHeight='90vh' flexDirection='column'>
      <Card
        w='70%'
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
            boxSize={24}
            fontSize={24}
          />
          <Heading my={3}>{user.name}</Heading>
          <Text>I am a cool guy , who likes build stuff with assembly :)</Text>
        </CardHeader>

        <CardBody py={0} my={5}>
          <Stack spacing={8} direction='row'>
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

      <Card w='70%' mx='auto' mb={5}>
        <CardBody py={0} mt={5}>
          <Tabs colorScheme='brand'>
            <TabList>
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
                    <Flex w='100%' py={0} mt={5} justifyContent='center'>
                      <Button mr={2} isDisabled={true}>
                        Prev
                      </Button>
                      <Button ml={2}>Next</Button>
                    </Flex>
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
                    <Flex w='100%' py={0} mt={5} justifyContent='center'>
                      <Button mr={2} isDisabled={true}>
                        Prev
                      </Button>
                      <Button ml={2}>Next</Button>
                    </Flex>
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
                    <SimpleGrid columns={2} spacing={10}>
                      {communities.map((community, i) => {
                        return (
                          <ProfileCommunityCard community={community} key={i} />
                        );
                      })}
                    </SimpleGrid>
                    <Flex w='100%' py={0} mt={5} justifyContent='center'>
                      <Button mr={2} isDisabled={true}>
                        Prev
                      </Button>
                      <Button ml={2}>Next</Button>
                    </Flex>
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
  );
}
