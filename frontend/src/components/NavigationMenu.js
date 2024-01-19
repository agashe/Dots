import {
  Box,
  List,
  ListItem,
  ListIcon,
  Link,
  Divider,
  Heading,
  Flex,
  Spacer,
} from '@chakra-ui/react';

import {
  MdCall,
  MdDoneOutline,
  MdHome,
  MdInfo,
  MdQuestionMark,
  MdRemoveRedEye,
} from 'react-icons/md';

export function NavigationMenu() {
  const rightTags = [
    'Travel', 'Tech', 'Science', 'Politics', 'Programming', 'Music', 'Movies',
    'History', 'Fashion', 'Art', 'Anime', 'Business',
  ];

  const leftTags = [
    'Cars', 'DIY', 'Food', 'Law', 'Military', 'Place', 'Podcast',
    'Reading', 'Religion', 'Pets', 'Sports', 'Gaming',
  ];

  return (
    <>
      <List spacing={3} fontSize='xl' color='brand.main'>
        <ListItem>
          <Link p='5' my='2'>
            <ListIcon as={MdHome} boxSize={6} /> Home
          </Link>
        </ListItem>
        <ListItem>
          <Link p='5' my='2'>
            <ListIcon as={MdQuestionMark} boxSize={6} /> FAQ
          </Link>
        </ListItem>
        <ListItem>
          <Link p='5' my='2'>
            <ListIcon as={MdDoneOutline} boxSize={6} /> Terms of usage
          </Link>
        </ListItem>
        <ListItem>
          <Link p='5' my='2'>
            <ListIcon as={MdRemoveRedEye} boxSize={6} /> Privacy Policy
          </Link>
        </ListItem>
        <ListItem>
          <Link p='5' my='2'>
            <ListIcon as={MdCall} boxSize={6} /> Contact
          </Link>
        </ListItem>
        <ListItem>
          <Link p='5' my='2'>
            <ListIcon as={MdInfo} boxSize={6} /> About
          </Link>
        </ListItem>
      </List>

      <Box px={5} mb={2}>
        <Divider my={5} />

        <Box>
          <Heading as='h6' size='sm' mb={5}>Explore</Heading>

          <Flex>
            <List spacing={3} color='brand.main'>
              {
                leftTags.map((tag) => {
                  return (
                    <ListItem>
                      <Link ml={1} color='brand.main'>#{tag}</Link>
                    </ListItem>
                  );
                })
              }
            </List>

            <Spacer />

            <List spacing={3} color='brand.main'>
              {
                rightTags.map((tag) => {
                  return (
                    <ListItem>
                      <Link ml={1} color='brand.main'>#{tag}</Link>
                    </ListItem>
                  );
                })
              }
            </List>
          </Flex>
        </Box>

        <Divider mt={5} mb={2} />

        <small>Dots &copy; 2024, All Rights Reserved</small>
      </Box>
    </>
  );
}