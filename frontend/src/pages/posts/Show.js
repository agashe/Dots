import { Flex, Box, Show as ShowSideMenu, useToast } from "@chakra-ui/react";
import { LatestPosts } from "../../components/LatestPosts";
import { PopularCommunities } from "../../components/PopularCommunities";
import { ShowPostCard } from "../../components/ShowPostCard";
import { AddComment } from "../../components/AddComment";
import { Comments } from "../../components/Comments";
import { Footer } from "../../components/Footer";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { SEO } from "../../components/SEO";
import axios from 'axios';

export function Show() {
  const [postContent, setPostContent] = useState({});
  const { id, title } = useParams();
  const { t } = useTranslation();
  const toast = useToast();

  useEffect(function () {
    window.scrollTo(0, 0);

    axios.post(process.env.REACT_APP_BACKEND_URL + '/posts/show', {
      post_id: id,
      page: 1
    })
      .then(function (response) {
        setPostContent(response.data.data);
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

  const seoInfo = {
    title: postContent.post ? postContent.post.title : '',
    description: postContent.post ? postContent.post.text.slice(0, 100) : '',
    keywords: postContent.post ? postContent.post.tags.join(' , ') : '',
    image: postContent.post ? postContent.post.banner : '',
  };

  return (
    <>
      <SEO info={seoInfo} />
      <Flex spacing={5} pt={5} px={{ base: 3, lg: 10 }} mb={5} >
        <Box w={{ base: '100%', lg: '70%' }} mr={{ base: 0, lg: 5 }}>
          {
            postContent.post != undefined ? 
            <>
              <ShowPostCard post={postContent.post} />
              <AddComment postId={postContent.post} />
              <Comments comments={[]} />
            </> : ''
          }
        </Box>

        <ShowSideMenu above="lg">
          <Box w='30%'>
            {
              postContent.post != undefined ? <>
                <LatestPosts posts={postContent.top_posts} />
                <PopularCommunities communities={postContent.popular_communities} />
              </> : ''
            }
            <Box w='100%' textAlign='center' mt={5}>
              <Footer />
            </Box>
          </Box>
        </ShowSideMenu>
      </Flex>
    </>
  );
}
