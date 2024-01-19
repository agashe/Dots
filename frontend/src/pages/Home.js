import { Flex, Box } from '@chakra-ui/react';
import { NavigationMenu } from '../components/NavigationMenu';
import { LatestPosts } from '../components/LatestPosts';
import { PopularCommunities } from '../components/PopularCommunities';
import { PostCard } from '../components/PostCard';

export function Home() {
  const posts = [
    {
      'title': 'Lorem ipsum dolor sit amet',
      'image': 'https://w.wallhaven.cc/full/jx/wallhaven-jxyopy.png',
      'community': 'All stars',
      'date': '15 Mar 2021',
      'tags': ['Place', 'Music'],
      'counters': {
        rate: 777,
        comments: 200
      },
      'user': {
        name: 'Ahmed Omar',
        avatar: ''
      },
    },
    {
      'title': `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis. 
        Duis euismod neque ac convallis molestie`,
      'image': '',
      'community': 'Cool_people',
      'date': '17 Jan',
      'tags': ['Cars', 'Science', 'Tech'],
      'counters': {
        rate: 5000,
        comments: 5000
      },
      'user': {
        name: 'Segun Adebayo',
        avatar: 'https://bit.ly/sage-adebayo'
      },
    }
  ];

  return (
    <Flex pt={5} px={10} bg='gray.50'>
      <Box w='30%'>
        <NavigationMenu />
      </Box>
      <Box w='60%'>
        {
          posts.map((post) => {
            return <PostCard post={post} />
          })
        }
      </Box>
      <Box w='30%'>
        <LatestPosts />
        <PopularCommunities />
      </Box>
    </Flex>
  );
}