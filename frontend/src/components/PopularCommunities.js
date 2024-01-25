import {
  Box,
  Card,
  CardBody,
  Heading,
  CardHeader,
  Stack,
  StackDivider,
  Text,
  Image,
  Link,
  Flex,
} from '@chakra-ui/react';

import { Link as ReactRouterLink } from 'react-router-dom'

export function PopularCommunities() {
  return (
    <Card mr={5} >
      <CardHeader pb={0}>
        <Heading size='md'>Popular Communities</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Link _hover={{ textDecoration: "none" }} as={ReactRouterLink} to={'/c/Night owls'}>
            <Box>
              <Link _hover={{ textDecoration: "none" }}>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                  <Image boxSize={8} src='/images/moon-icon.jpeg' fallbackSrc='/images/group-placeholder.png' />

                  <Box>
                    <Heading size='sm'>Night owls</Heading>
                    <Text fontSize='xs'>1.1k members </Text>
                  </Box>
                </Flex>
              </Link>
            </Box>
          </Link>
          <Box>
            <Link _hover={{ textDecoration: "none" }}>
              <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Image boxSize={8} src='/images/star-icon.png' fallbackSrc='/images/group-placeholder.png' />

                <Box>
                  <Heading size='sm'>All stars</Heading>
                  <Text fontSize='xs'>100 members </Text>
                </Box>
              </Flex>
            </Link>
          </Box>
          <Box>
            <Link _hover={{ textDecoration: "none" }}>
              <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Image boxSize={8} src='/images/sun-icon.png' fallbackSrc='/images/group-placeholder.png' />

                <Box>
                  <Heading size='sm'>Cool_people</Heading>
                  <Text fontSize='xs'>10.2M members </Text>
                </Box>
              </Flex>
            </Link>
          </Box>
          <Box>
            <Link _hover={{ textDecoration: "none" }}>
              <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Image boxSize={8} src='unknown.png' fallbackSrc='/images/group-placeholder.png' />

                <Box>
                  <Heading size='sm'>The Unknown</Heading>
                  <Text fontSize='xs'>2 members </Text>
                </Box>
              </Flex>
            </Link>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}