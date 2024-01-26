import { Flex, Box } from '@chakra-ui/react';
import { LatestPosts } from '../../components/LatestPosts';
import { PopularCommunities } from '../../components/PopularCommunities';
import { PostCard } from '../../components/PostCard';

export function Show() {
  const post = {
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
  };

  return (
    <Flex pt={5} px={10} bg='gray.50'>
      <Box w='80%'>
        <PostCard post={post} />
      </Box>
      <Box w='30%'>
        <LatestPosts />
        <PopularCommunities />
      </Box>
    </Flex>
  );
}