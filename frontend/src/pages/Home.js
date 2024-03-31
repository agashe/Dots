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
  const user = JSON.parse(localStorage.getItem('user'));
  const [homePageContent, setHomePageContent] = useState({});
  const [cardContent, setCardContent] = useState('');
  const { id, name } = useParams();
  const { t } = useTranslation();
  const location = useLocation();
  const toast = useToast();
  let url = '/posts/list';
  let params = {
    entity: '',
    entity_id: '',
    page: 1
  };

  useEffect(function () {
    window.scrollTo(0, 0);

    if (location.pathname.includes('/t/')) {
      params.entity =  'tag';
      params.entity_id = name.replaceAll('+', ' ');
    }
    else if (location.pathname.includes('/c/')) {
      params.entity =  'community';
      params.entity_id = name.replaceAll('+', ' ');
    }
    else if (location.pathname.includes('/u/')) {
      params.entity =  'user';
      params.entity_id = id;
    }
    else {
      url = user !== null ? "/users/timeline" : "/home";
      params = {
        page: 1
      };
    }

    axios.get(url, {params: params})
      .then(function (response) {
        if (location.pathname.includes('/t/')) {
          setCardContent(<TagCard tag={response.data.data.entity} />);
        }
        else if (location.pathname.includes('/c/')) {
          setCardContent(<CommunityCard community={response.data.data.entity} />);
        }
        else if (location.pathname.includes('/u/')) {
          setCardContent(<UserCard user={response.data.data.entity} />);
        }

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
              {cardContent}
            </Box>
          </Show>

          {homePageContent.posts && (homePageContent.posts.length > 0) ? (
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
