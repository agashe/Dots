import {
  Box,
  List,
  ListItem,
  ListIcon,
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
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Footer } from "./Footer";

export function NavigationMenu({ tags }) {
  const { t } = useTranslation();

  const rightTags = tags.slice(0, (tags.length / 2));
  const leftTags = tags.slice(tags.length / 2);

  return (
    <>
      <List spacing={3} fontSize='xl' color='brand.main'>
        <ListItem pl='4' my='2'>
          <Link reloadDocument to='/'>
            <ListIcon as={MdHome} boxSize={6} /> {t('home')}
          </Link>
        </ListItem>
        <ListItem pl='4' my='2'>
          <Link reloadDocument to='/FAQ'>
            <ListIcon as={MdQuestionMark} boxSize={6} /> {t('faq')}
          </Link>
        </ListItem>
        <ListItem pl='4' my='2'>
          <Link reloadDocument to='/terms-of-usage'>
            <ListIcon as={MdDoneOutline} boxSize={6} /> {t('terms')}
          </Link>
        </ListItem>
        <ListItem pl='4' my='2'>
          <Link reloadDocument to='/privacy-policy'>
            <ListIcon as={MdRemoveRedEye} boxSize={6} /> {t('privacy')}
          </Link>
        </ListItem>
        <ListItem pl='4' my='2'>
          <Link reloadDocument to='/contact'>
            <ListIcon as={MdCall} boxSize={6} /> {t('contact')}
          </Link>
        </ListItem>
        <ListItem pl='4' my='2'>
          <Link reloadDocument to='/about'>
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
                    <Link reloadDocument
                      ml={1}
                      color='brand.main'
                      to={"/t/" + tag.name}
                    >
                      #{tag.name}
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
                    <Link reloadDocument
                      ml={1}
                      color='brand.main'
                      to={"/t/" + tag.name}
                    >
                      #{tag.name}
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </Flex>
        </Box>

        <Divider mt={5} mb={2} />

        <Footer />
      </Box>
    </>
  );
}
