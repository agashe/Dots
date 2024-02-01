import { Flex, Box } from "@chakra-ui/react";
import { NavigationMenu } from "../components/NavigationMenu";
import { LatestPosts } from "../components/LatestPosts";
import { PopularCommunities } from "../components/PopularCommunities";
import { PostCard } from "../components/PostCard";
import { NoResults } from "../components/NoResults";

export function Home() {
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

  return (
    <Flex pt={5} px={10} bg='gray.50'>
      <Box w='30%'>
        <NavigationMenu />
      </Box>
      <Box w='60%'>
        {posts.length ? (
          posts.map((post, i) => {
            return <PostCard post={post} key={i} />;
          })
        ) : (
          <NoResults message='It seems that no posts have been published yet' />
        )}
      </Box>
      <Box w='30%'>
        <LatestPosts />
        <PopularCommunities />
      </Box>
    </Flex>
  );
}
