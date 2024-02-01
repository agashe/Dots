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
} from "@chakra-ui/react";
import {
  MdCall,
  MdDoneOutline,
  MdHome,
  MdInfo,
  MdQuestionMark,
  MdRemoveRedEye,
} from "react-icons/md";
import { Link as ReactRouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function NavigationMenu() {
  const { t } = useTranslation();

  const rightTags = [
    "Travel",
    "Tech",
    "Science",
    "Politics",
    "Programming",
    "Music",
    "Movies",
    "History",
    "Fashion",
    "Art",
    "Anime",
    "Business",
  ];

  const leftTags = [
    "Cars",
    "DIY",
    "Food",
    "Law",
    "Military",
    "Place",
    "Podcast",
    "Reading",
    "Religion",
    "Pets",
    "Sports",
    "Gaming",
  ];

  return (
    <>
      <List spacing={3} fontSize='xl' color='brand.main'>
        <ListItem>
          <Link p='5' my='2' as={ReactRouterLink} to='/'>
            <ListIcon as={MdHome} boxSize={6} /> {t('home')}
          </Link>
        </ListItem>
        <ListItem>
          <Link p='5' my='2' as={ReactRouterLink} to='/FAQ'>
            <ListIcon as={MdQuestionMark} boxSize={6} /> {t('faq')}
          </Link>
        </ListItem>
        <ListItem>
          <Link p='5' my='2' as={ReactRouterLink} to='/terms-of-usage'>
            <ListIcon as={MdDoneOutline} boxSize={6} /> {t('terms')}
          </Link>
        </ListItem>
        <ListItem>
          <Link p='5' my='2' as={ReactRouterLink} to='/privacy-policy'>
            <ListIcon as={MdRemoveRedEye} boxSize={6} /> {t('privacy')}
          </Link>
        </ListItem>
        <ListItem>
          <Link p='5' my='2' as={ReactRouterLink} to='/contact'>
            <ListIcon as={MdCall} boxSize={6} /> {t('contact')}
          </Link>
        </ListItem>
        <ListItem>
          <Link p='5' my='2' as={ReactRouterLink} to='/about'>
            <ListIcon as={MdInfo} boxSize={6} /> {t('about')}
          </Link>
        </ListItem>
      </List>

      <Box px={5} mb={2}>
        <Divider my={5} />

        <Box>
          <Heading as='h6' size='sm' mb={5}>
            {t('explore')}
          </Heading>

          <Flex>
            <List spacing={3} color='brand.main'>
              {leftTags.map((tag, i) => {
                return (
                  <ListItem key={i}>
                    <Link
                      ml={1}
                      color='brand.main'
                      as={ReactRouterLink}
                      to={"/t/" + tag}
                    >
                      #{tag}
                    </Link>
                  </ListItem>
                );
              })}
            </List>

            <Spacer />

            <List spacing={3} color='brand.main'>
              {rightTags.map((tag, i) => {
                return (
                  <ListItem key={i}>
                    <Link
                      ml={1}
                      color='brand.main'
                      as={ReactRouterLink}
                      to={"/t/" + tag}
                    >
                      #{tag}
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </Flex>
        </Box>

        <Divider mt={5} mb={2} />

        <small>
          Dots &copy; {new Date().getFullYear()}, All Rights Reserved
        </small>
      </Box>
    </>
  );
}
