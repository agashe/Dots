import {
  Flex,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Show,
  Hide,
  useToast,
} from "@chakra-ui/react";
import { NavigationMenu } from "../components/NavigationMenu";
import { LatestPosts } from "../components/LatestPosts";
import { PopularCommunities } from "../components/PopularCommunities";
import { PostCard } from "../components/PostCard";
import { NoResults } from "../components/NoResults";
import { SearchCommunityCard } from "../components/SearchCommunityCard";
import { SearchUserCard } from "../components/SearchUserCard";
import { useTranslation } from "react-i18next";
import { SEO } from "../components/SEO";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

export function Search() {
  const { t } = useTranslation();
  let { keyword } = useParams();
  const [searchResults, setSearchResults] = useState({});
  const toast = useToast();

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.value = keyword.replace('+', ' ');
  }

  function search(type) {
    axios.post(process.env.REACT_APP_BACKEND_URL + "/search", {
      entity: type,
      keyword: keyword,
      page: 1,
    })
      .then(function (response) {
        setSearchResults(response.data.data);
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

  useEffect(function () {
    window.scrollTo(0, 0);
    search('post');
  }, []);

  return (
    <>
      <SEO info={{ title: t('search_results') + keyword }} />
      <Flex pt={5} px={{ base: 5, md: 2, lg: 10 }} >
        <Hide below="md">
          <Box w={{ md: '35%', lg: '25%' }}>
            <NavigationMenu tags={searchResults.tags ?? []} />
          </Box>
        </Hide>
        <Box w={{ base: '100%', md: '65%', lg: '50%' }}>
          <Tabs colorScheme='brand'>
            <TabList w={{ base: '100%', lg: '90%' }} mx='auto'>
              <Tab onClick={(e) => { search('post') }}>{t('posts')}</Tab>
              <Tab onClick={(e) => { search('user') }}>{t('users')}</Tab>
              <Tab onClick={(e) => { search('community') }}>{t('communities')}</Tab>
            </TabList>

            <TabPanels>
              <TabPanel px={{ base: 0, lg: 5 }}>
                {searchResults.entity == 'post' &&
                  searchResults.results.length ? (
                  searchResults.results.map((post, i) => {
                    return <PostCard post={post} key={post.id} />;
                  })
                ) : (
                  <NoResults message={t('errors.no_items_were_found', { items: 'posts' })} />
                )}
              </TabPanel>

              <TabPanel px={{ base: 0, lg: 5 }}>
                {searchResults.entity == 'user' &&
                  searchResults.results.length ? (
                  <>
                    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
                      {searchResults.results.map((user, i) => {
                        return <SearchUserCard user={user} key={user.id} />;
                      })}
                    </SimpleGrid>
                  </>
                ) : (
                  <NoResults message={t('errors.no_items_were_found', { items: 'users' })} />
                )}
              </TabPanel>

              <TabPanel px={{ base: 0, lg: 5 }}>
                {searchResults.entity == 'community' &&
                  searchResults.results.length ? (
                  <>
                    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
                      {searchResults.results.map((community, i) => {
                        return (
                          <SearchCommunityCard community={community} key={community.id} />
                        );
                      })}
                    </SimpleGrid>
                  </>
                ) : (
                  <NoResults message={t('errors.no_items_were_found', { items: 'communities' })} />
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Show above="lg">
          <Box w='25%'>
            <LatestPosts posts={searchResults.top_posts ?? []} />
            <PopularCommunities communities={searchResults.popular_communities ?? []} />
          </Box>
        </Show>
      </Flex>
    </>
  );
}
