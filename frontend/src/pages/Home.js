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
  const [cardContent, setCardContent] = useState('');
  const toast = useToast();
  const user = JSON.parse(localStorage.getItem('user'));
  const url = user !== null ? "/users/timeline" : "/home";
  // const headers = user !== null ? {
  //   headers: {
  //     "Authorization": `Bearer ${user.token}`
  //   },
  // } : "";

  useEffect(function () {
    window.scrollTo(0, 0);

    if (location.pathname.includes('/t/')) {
      axios.post('/posts/list', {
        entity: 'tag',
        entity_id: name.replaceAll('+', ' '),
        page: 1
      })
        .then(function (response) {
          setCardContent(<TagCard tag={response.data.data.entity} />);
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
    }
    else if (location.pathname.includes('/c/')) {
      axios.post('/posts/list', {
        entity: 'community',
        entity_id: name.replaceAll('+', ' '),
        page: 1
      })
        .then(function (response) {
          setCardContent(<CommunityCard community={response.data.data.entity} />);
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
    }
    else if (location.pathname.includes('/u/')) {
      axios.post('/posts/list', {
        entity: 'user',
        entity_id: id,
        page: 1
      })
        .then(function (response) {
          setCardContent(<UserCard user={response.data.data.entity} />);
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
    }
    else {
      axios.post(url, {
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
    }
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
              {cardContent}
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
            {cardContent}
            <LatestPosts posts={homePageContent.top_posts ?? []} />
            <PopularCommunities communities={homePageContent.popular_communities ?? []} />
          </Box>
        </Show>
      </Flex>
    </>
  );
}
