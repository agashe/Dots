import {
  Flex,
  Box,
  List,
  ListItem,
  ListIcon,
  Link,
  Card,
  CardBody,
  CardFooter,
  Heading,
  CardHeader,
  Stack,
  StackDivider,
  Text,
  Divider,
  Image,
  Button,
  Icon,
  Spacer
} from '@chakra-ui/react';

import { MdCall, MdDoneOutline, MdHome, MdInfo, MdQuestionMark, MdRemoveRedEye, MdChat, MdOutlineShare, MdOutlineThumbUp } from 'react-icons/md';

export function Home() {
  return (
    <Flex>
      <Box w='30%'>
        <List spacing={3} py={5} pl={5} fontSize='xl' color='brand.main'>
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

        <Box w='75%' mx='auto'>
          <Divider />

          Dots &copy; 2024, All rights are reserved
        </Box>
      </Box>
      <Box w='60%' pt={5}>
        <Card w='90%' mx='auto'>
          <CardBody>
            <Image
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md'>Living room Sofa</Heading>
              <Text>
                This sofa is perfect for modern tropical spaces, baroque inspired
                spaces, earthy toned spaces and for people who love a chic design with a
                sprinkle of vintage design.
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Flex w='100%'>
              <Button variant='ghost' leftIcon={<Icon as={MdOutlineThumbUp} />}>
                Like
              </Button>
              <Spacer />
              <Button variant='ghost' leftIcon={<Icon as={MdChat} />}>
                Comment
              </Button>
              <Spacer />
              <Button variant='ghost' leftIcon={<Icon as={MdOutlineShare} />}>
                Share
              </Button>
            </Flex>
          </CardFooter>
        </Card>
      </Box>
      <Box w='30%'>
        <Card my={5} mr={5} >
          <CardHeader>
            <Heading size='md'>Client Report</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Summary
                </Heading>
                <Text pt='2' fontSize='sm'>
                  View a summary of all your clients over the last month.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Overview
                </Heading>
                <Text pt='2' fontSize='sm'>
                  Check out the overview of your clients.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Analysis
                </Heading>
                <Text pt='2' fontSize='sm'>
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </Flex>
  );
}