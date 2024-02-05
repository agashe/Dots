import {
  HStack,
  Box,
  Heading,
  Text,
  Link,
  Avatar,
  Icon,
} from "@chakra-ui/react";

import { MdNotifications } from "react-icons/md";

export function NotificationCard({ notification }) {
  return (
    <Link reloadDocument _hover={{ textDecoration: "none" }}>
      <Box p={3} shadow='md' borderWidth='1px'>
        <HStack>
          <Box mr={5}>
            {notification.type == "comment" ? (
              <Avatar
                name={notification.user.name}
                src={notification.user.avatar}
                bg='brand.main'
                color='white'
                boxSize={10}
              />
            ) : (
              <Icon
                as={MdNotifications}
                boxSize={10}
                color='brand.main'
                mt={1}
              />
            )}
          </Box>
          <Box>
            <Heading fontSize='xl'>{notification.message}</Heading>
          </Box>
        </HStack>
        <Text fontSize='sm' mt={5}>
          {notification.date}
        </Text>
      </Box>
    </Link>
  );
}
