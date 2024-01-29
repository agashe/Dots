import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Button,
  Flex,
  Spacer,
  Select,
  Divider,
} from '@chakra-ui/react';

import { Comment } from './Comment';

export function Comments({ comments }) {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Card ml={5} mb={5}>
      <CardHeader py={3}>
        <Flex alignItems='center'>
          <Heading size='md'>Comments</Heading>

          <Spacer />

          {
            comments.length ?
              <Select width='20%'>
                <option value='popular'>Popular</option>
                <option value='latest'>Latest</option>
                <option value='oldest'>Oldest</option>
                <option value='unpopular'>Unpopular</option>
              </Select>
              : ''
          }

        </Flex>
      </CardHeader>

      <Divider />

      <CardBody>
        {
          comments.length ?
            comments.map((comment) => {
              return <Comment comment={comment} />;
            })
            :
            <Heading >Be fist to comment !</Heading>
        }
      </CardBody>

      {
        comments.length ?
          <CardFooter pt={0} pb={5}>
            <Button mx='auto' variant='outline'>Load More</Button>
          </CardFooter>
          : ''
      }
    </Card>
  );
}