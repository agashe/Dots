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
  const [searchResultItems, setSearchResultItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchType, setSearchType] = useState('post');
  const toast = useToast();

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.value = keyword.replace('+', ' ');
  }

  function search(type) {
    axios.get("/search", {
      params: {
        entity: type,
        keyword: keyword,
        page: currentPage,
      }
    })
      .then(function (response) {
        setSearchResults(response.data.data);
        setSearchResultItems([...searchResultItems, ...response.data.data.results]);
        setTotalPages(response.data.data.pages);
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
    search(searchType);
  }, [searchType]);

  const handleScroll = () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;

    if (bottom) {
      if ((currentPage + 1) <= totalPages) {
        setCurrentPage(currentPage + 1);
        search(searchType);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage, totalPages]);

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
              <Tab onClick={(e) => { setSearchResultItems([]);setSearchType('post'); }}>{t('posts')}</Tab>
              <Tab onClick={(e) => { setSearchResultItems([]);setSearchType('user'); }}>{t('users')}</Tab>
              <Tab onClick={(e) => { setSearchResultItems([]);setSearchType('community'); }}>{t('communities')}</Tab>
            </TabList>

            <TabPanels>
              <TabPanel px={{ base: 0, lg: 5 }}>
                {searchResults.entity == 'post' &&
                  searchResultItems.length ? (
                  searchResultItems.map((post, i) => {
                    return <PostCard post={post} key={post.id} />;
                  })
                ) : (
                  <NoResults message={t('errors.no_items_were_found', { items: 'posts' })} />
                )}
              </TabPanel>

              <TabPanel px={{ base: 0, lg: 5 }}>
                {searchResults.entity == 'user' &&
                  searchResultItems.length ? (
                  <>
                    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
                      {searchResultItems.map((user, i) => {
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
                  searchResultItems.length ? (
                  <>
                    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
                      {searchResultItems.map((community, i) => {
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
