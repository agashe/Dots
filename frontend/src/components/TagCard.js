import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  Avatar,
  Flex,
  Stack,
  Icon,
  Divider,
} from '@chakra-ui/react';

import { MdCake, MdMap, MdCardMembership } from 'react-icons/md';

export function TagCard() {
  return (
    <Card mr={5} mb={5}>
      <CardBody color='brand.main'>
        <Heading size='lg'>#Travel</Heading>
      </CardBody>
    </Card>
  );
}