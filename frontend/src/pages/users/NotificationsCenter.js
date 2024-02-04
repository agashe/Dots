import {
  Flex,
  Button,
  Card,
  CardBody,
  Heading,
  CardHeader,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { Footer } from "../../components/Footer";
import { NotificationCard } from "../../components/NotificationCard";
import { useTranslation } from "react-i18next";

export function NotificationCenter() {
  // const user = JSON.parse(localStorage.getItem("user"));
  const { t } = useTranslation();

  const notifications = [
    {
      message: "Lorem ipsum dolor sit amet",
      type: "post",
      date: "7 Feb 2022",
    },
    {
      message: "Lorem ipsum dolor sit amet",
      type: "comment",
      user: {
        name: "Hessan Al Said",
        avatar:
          "https://i.pinimg.com/736x/8e/6d/89/8e6d8909b822dc22b8488c6f5fe471d4.jpg",
      },
      date: "7 Feb 2022",
    },
    {
      message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis. 
        Duis euismod neque ac convallis molestie`,
      type: "comment",
      user: {
        name: "Hessan Al Said",
        avatar:
          "https://i.pinimg.com/736x/8e/6d/89/8e6d8909b822dc22b8488c6f5fe471d4.jpg",
      },
      date: "24 May 2020",
    },
  ];

  return (
    <Flex pt={5} px={10} bg='gray.50' minHeight='90vh' flexDirection='column'>
      <Card w='70%' mx='auto' mb={5}>
        <CardHeader py={0} pt={3}>
          <Heading textAlign='center'>{t('notifications')}</Heading>
        </CardHeader>

        <CardBody py={5}>
          {notifications.length ? (
            <>
              <Stack spacing={5}>
                {notifications.map((notification, i) => {
                  return (
                    <NotificationCard notification={notification} key={i} />
                  );
                })}
              </Stack>
              <Flex w='100%' py={0} mt={5} justifyContent='center'>
                <Button mr={2} isDisabled={true}>
                  Prev
                </Button>
                <Button ml={2}>Next</Button>
              </Flex>
            </>
          ) : (
            <Heading textAlign='center' size='md' p={5} pb={0}>
              {t('errors.no_notifications')}
            </Heading>
          )}
        </CardBody>
      </Card>

      <Spacer />

      <Footer />
    </Flex>
  );
}
