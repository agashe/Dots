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
  useToast,
} from "@chakra-ui/react";
import { Comment } from "./Comment";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import axios from 'axios';

export function Comments({ postId }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [filter, setFilter] = useState('popular');
  const [comments, setComments] = useState([]);
  const { t } = useTranslation();
  const toast = useToast();

  useEffect(function () {
    axios.get('/comments/list', {
      params: {
        post_id: postId,
        filter: filter,
        page: 1,
      }
    })
      .then(function (response) {
        setComments(response.data.data.comments);
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
  }, [filter]);

  return (
    <Card ml={{ base: 0, lg: 5 }} mb={5}>
      <CardHeader py={3}>
        <Flex alignItems='center'>
          <Heading size='md'>{t('comments')}</Heading>

          <Spacer />

          {comments.length ? (
            <Select width={{ base: '45%', md: '20%' }} value={filter} onChange={(e) => { setFilter(e.target.value) }}>
              <option value='popular'>{t('comments_sort.popular')}</option>
              <option value='latest'>{t('comments_sort.latest')}</option>
              <option value='oldest'>{t('comments_sort.oldest')}</option>
              <option value='unpopular'>{t('comments_sort.unpopular')}</option>
            </Select>
          ) : (
            ""
          )}
        </Flex>
      </CardHeader>

      <Divider />

      <CardBody px={{ base: 1, lg: 5 }}>
        {comments.length ? (
          comments.map((comment, i) => {
            return <Comment comment={comment} key={comment.id} />;
          })
        ) : (
          <Heading>{t('comment_hint')}</Heading>
        )}
      </CardBody>

      {
    comments.length ? (
      <CardFooter pt={0} pb={5}>
        <Button mx='auto' variant='outline'>
          {t('actions.load_more')}
        </Button>
      </CardFooter>
    ) : (
    ""
  )
  }
    </Card >
  );
}
