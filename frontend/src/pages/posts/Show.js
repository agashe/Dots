import { Flex, Box, Show as ShowSideMenu } from "@chakra-ui/react";
import { LatestPosts } from "../../components/LatestPosts";
import { PopularCommunities } from "../../components/PopularCommunities";
import { ShowPostCard } from "../../components/ShowPostCard";
import { AddComment } from "../../components/AddComment";
import { Comments } from "../../components/Comments";
import { Footer } from "../../components/Footer";
import { useEffect } from "react";
import { SEO } from "../../components/SEO";

export function Show() {
  const post = {
    title: "Lorem ipsum dolor sit amet",
    image: "https://w.wallhaven.cc/full/jx/wallhaven-jxyopy.png",
    community: "All stars",
    date: "15 Mar 2021",
    tags: ["Place", "Music"],
    body: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
      Duis euismod neque ac convallis molestie.
      <br />
      <br />
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
      Duis euismod neque ac convallis molestie.
      <br />
      <br />
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
      Duis euismod neque ac convallis molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
      Duis euismod neque ac convallis molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
      Duis euismod neque ac convallis molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
      Duis euismod neque ac convallis molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
      Duis euismod neque ac convallis molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
      Duis euismod neque ac convallis molestie.
      <br />
      <br />
      <br />

      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
      Duis euismod neque ac convallis molestie.
      <br />
      <br />
      <br />
      <br />

      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
      Duis euismod neque ac convallis molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
      Duis euismod neque ac convallis molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
      Duis euismod neque ac convallis molestie.
    `,
    counters: {
      rate: 777,
      comments: 200,
    },
    user: {
      name: "Ahmed Omar",
      avatar: "",
    },
    comments: [
      {
        title: "Lorem ipsum dolor sit amet",
        comment: "Lorem ipsum ...",
        user: {
          name: "Hessan Al Said",
          avatar:
            "https://i.pinimg.com/736x/8e/6d/89/8e6d8909b822dc22b8488c6f5fe471d4.jpg",
        },
        rate: "40",
        date: "7 Feb 2022",
        sub_comments: [
          {
            title: "Lorem ipsum dolor sit amet",
            comment: "Lorem ipsum ...",
            user: {
              name: "Hessan Al Said",
              avatar:
                "https://i.pinimg.com/736x/8e/6d/89/8e6d8909b822dc22b8488c6f5fe471d4.jpg",
            },
            rate: "40",
            date: "7 Feb 2022",
            sub_comments: [
              {
                title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis. 
                  Duis euismod neque ac convallis molestie`,
                comment: "Suspendisse venenatis imperdiet lobortis ...",
                user: {
                  name: "Hessan Al Said",
                  avatar:
                    "https://i.pinimg.com/736x/8e/6d/89/8e6d8909b822dc22b8488c6f5fe471d4.jpg",
                },
                rate: "-1",
                date: "24 May 2020",
                sub_comments: [],
              },
            ],
          },
          {
            title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis. 
              Duis euismod neque ac convallis molestie`,
            comment: "Suspendisse venenatis imperdiet lobortis ...",
            user: {
              name: "Hessan Al Said",
              avatar:
                "https://i.pinimg.com/736x/8e/6d/89/8e6d8909b822dc22b8488c6f5fe471d4.jpg",
            },
            rate: "-1",
            date: "24 May 2020",
            sub_comments: [],
          },
        ],
      },
      {
        title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis. 
          Duis euismod neque ac convallis molestie`,
        comment: "Suspendisse venenatis imperdiet lobortis ...",
        user: {
          name: "Hessan Al Said",
          avatar:
            "https://i.pinimg.com/736x/8e/6d/89/8e6d8909b822dc22b8488c6f5fe471d4.jpg",
        },
        rate: "-1",
        date: "24 May 2020",
        sub_comments: [],
      },
    ],
  };

  useEffect(function () {
    window.scrollTo(0, 0);
  }, []);

  const seoInfo = {
    title: post.title,
    description: post.body.slice(0, 100),
    keywords: post.tags.join(' , '),
    image: post.image,
  };

  return (
    <>
      <SEO info={seoInfo} />
      <Flex spacing={5} pt={5} px={{ base: 3, lg: 10 }} mb={5} >
        <Box w={{ base: '100%', lg: '70%' }} mr={{ base: 0, lg: 5 }}>
          <ShowPostCard post={post} />
          <AddComment postId={post.id} />
          <Comments comments={post.comments} />
        </Box>

        <ShowSideMenu above="lg">
          <Box w='30%'>
            <LatestPosts />
            <PopularCommunities />

            <Box w='100%' textAlign='center' mt={5}>
              <Footer />
            </Box>
          </Box>
        </ShowSideMenu>
      </Flex>
    </>
  );
}
