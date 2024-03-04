import { Flex, Box, Show, Hide, useToast } from "@chakra-ui/react";
import { useParams, useLocation } from "react-router-dom";
import { NavigationMenu } from "../components/NavigationMenu";
import { LatestPosts } from "../components/LatestPosts";
import { PopularCommunities } from "../components/PopularCommunities";
import { PostCard } from "../components/PostCard";
import { NoResults } from "../components/NoResults";
import { useTranslation } from "react-i18next";
import { TagCard } from "../components/TagCard";
import { CommunityCard } from "../components/CommunityCard";
import { UserCard } from "../components/UserCard";
import { useEffect, useState } from "react";
import { SEO } from "../components/SEO";
import axios from 'axios';

export function Home() {
  const { t } = useTranslation();

  // check current route , to load the posts data 
  // this could be for : user, tag, community or homepage
  let { id, name } = useParams();
  const location = useLocation();
  const [homePageContent, setHomePageContent] = useState({});
  const toast = useToast();
  let type = 'all';
  let card = '';

  if (location.pathname.includes('/t/')) {
    type = 'tag';
    card = <TagCard />;
  }
  else if (location.pathname.includes('/c/')) {
    type = 'community';
    card = <CommunityCard />;
  }
  else if (location.pathname.includes('/u/')) {
    type = 'user';
    card = <UserCard />;
  }

  useEffect(function () {
    window.scrollTo(0, 0);

    axios.post(process.env.REACT_APP_BACKEND_URL + "/home", {
      page: 1
    })
      .then(function (response) {
        setHomePageContent(response.data.data);
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

  return (
    <>
      <SEO info={{ title: name }} />
      <Flex pt={5} px={{ base: 5, md: 2, lg: 10 }}>
        <Hide below="md">
          <Box w={{ md: '35%', lg: '25%' }}>
            <NavigationMenu tags={homePageContent.tags ?? []} />
          </Box>
        </Hide>
        <Box w={{ base: '100%', md: '65%', lg: '50%' }}>
          <Show below="lg">
            <Box>
              {card}
            </Box>
          </Show>

          {homePageContent.posts ? (
            homePageContent.posts.map((post, i) => {
              return <PostCard post={post} key={i} />;
            })
          ) : (
            <NoResults message={t('errors.no_published_posts')} />
          )}
        </Box>
        <Show above="lg">
          <Box w='25%'>
            {card}
            <LatestPosts posts={homePageContent.top_posts ?? []} />
            <PopularCommunities communities={homePageContent.popular_communities ?? []} />
          </Box>
        </Show>
      </Flex>
    </>
  );
}
