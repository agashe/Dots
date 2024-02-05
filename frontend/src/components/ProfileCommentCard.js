import { Box, Heading, Text, Link } from "@chakra-ui/react";

export function ProfileCommentCard({ comment }) {
  return (
    <Link reloadDocument _hover={{ textDecoration: "none" }}>
      <Box p={3} shadow='md' borderWidth='1px'>
        <Heading fontSize='xl'>{comment.title}</Heading>
        <Text fontSize='md' my={1}>
          {comment.comment}
        </Text>
        <Text fontSize='sm' mt={5}>
          {comment.date}
        </Text>
      </Box>
    </Link>
  );
}
