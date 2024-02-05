import {
  Flex,
  Spacer,
  Box,
  ButtonGroup,
  Button,
  Input,
  IconButton,
  Icon,
  Link,
  Menu,
  MenuDivider,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import {
  MdSearch,
  MdDarkMode,
  MdNotifications,
  MdAdd,
  MdPerson,
  MdEdit,
  MdAddCircle,
  MdLogout,
} from "react-icons/md";
import { Outlet, Link as ReactRouterLink } from "react-router-dom";
import { SignIn } from "./auth/SignIn";
import { SignUp } from "./auth/SignUp";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export function Layout() {
  const { t } = useTranslation();

  const {
    isOpen: isOpenSignIn,
    onOpen: onOpenSignIn,
    onClose: onCloseSignIn,
  } = useDisclosure();

  const {
    isOpen: isOpenSignUp,
    onOpen: onOpenSignUp,
    onClose: onCloseSignUp,
  } = useDisclosure();

  const user = JSON.parse(localStorage.getItem("user"));

  const [searchKeyword, setSearchKeyword] = useState("");

  function handleSearchInput(event) {
    setSearchKeyword(event.target.value);
  }

  function submitSearch() {
    window.location.href = "/s/" + searchKeyword;
  }

  function signOut() {
    localStorage.removeItem("user");

    window.location.href = "/";
  }

  return (
    <div>
      <header
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          backgroundColor: "#ffffff",
          zIndex: "10",
        }}
      >
        <Flex
          minWidth='max-content'
          alignItems='center'
          gap='2'
          px={14}
          py={1}
          border='1px'
          borderColor='gray.200'
        >
          <Link reloadDocument
            _hover={{ textDecoration: "none" }}
            as={ReactRouterLink}
            to='/'
            width='15%'
          >
            <div className='logo'>
              D<span className='red-dot'></span>TS...
            </div>
          </Link>

          <Spacer />

          <Flex width='40%'>
            <Input placeholder={t('search')} onChange={handleSearchInput} />
            <IconButton
              colorScheme='brand'
              icon={<Icon as={MdSearch} boxSize={6} />}
              ml='2'
              onClick={submitSearch}
            />
          </Flex>

          <Spacer />

          <ButtonGroup
            gap='2'
            width='17%'
            justifyContent='right'
            paddingRight='2px'
          >
            <Tooltip label={t('dark_mode')}>
              <IconButton
                colorScheme='brand'
                icon={<Icon as={MdDarkMode} boxSize={6} />}
              />
            </Tooltip>

            {user ? (
              <>
                <Tooltip label={t('notifications')}>
                  <IconButton
                    as='a'
                    href='/notifications'
                    colorScheme='brand'
                    position='relative'
                    icon={
                      <>
                        <Icon as={MdNotifications} boxSize={6} />
                        <Box
                          as={"span"}
                          color={"black"}
                          position={"absolute"}
                          top={"-3px"}
                          left={"25px"}
                          fontSize={"0.8rem"}
                          bgColor={"orange"}
                          borderRadius='20px'
                          zIndex={9999}
                          p={"3px"}
                          width='20px'
                          height='20px'
                          textAlign='center'
                        >
                          0
                        </Box>
                      </>
                    }
                  />
                </Tooltip>

                <Tooltip label={t('actions.create_post')}>
                  <IconButton
                    as='a'
                    href='/create-post'
                    colorScheme='brand'
                    icon={<Icon as={MdAdd} boxSize={6} />}
                  />
                </Tooltip>

                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label={t('options')}
                    icon={
                      <Avatar
                        name={user.name}
                        src={user.avatar}
                        bg='brand.main'
                        color='white'
                        boxSize={10}
                      />
                    }
                    variant='ghost'
                    _focus={{ bg: "none" }}
                    _hover={{ bg: "none" }}
                  />
                  <MenuList>
                    <MenuItem
                      as='a'
                      href='/profile'
                      icon={<Icon as={MdPerson} boxSize={5} />}
                      iconSpacing={2}
                    >
                      {t('profile')}
                    </MenuItem>
                    <MenuItem
                      as='a'
                      href='/edit-profile'
                      icon={<Icon as={MdEdit} boxSize={5} />}
                      iconSpacing={2}
                    >
                      {t('actions.edit_profile')}
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      as='a'
                      href='/create-post'
                      icon={<Icon as={MdAdd} boxSize={5} />}
                      iconSpacing={2}
                    >
                      {t('actions.create_post')}
                    </MenuItem>
                    <MenuItem
                      as='a'
                      href='/create-community'
                      icon={<Icon as={MdAddCircle} boxSize={5} />}
                      iconSpacing={2}
                    >
                      {t('actions.create_community')}
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      as='button'
                      icon={<Icon as={MdLogout} boxSize={5} />}
                      iconSpacing={2}
                      onClick={signOut}
                    >
                      {t('user.sign_out')}
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <>
                <Button colorScheme='brand' onClick={onOpenSignIn}>
                  {t('user.sign_in')}
                </Button>
                <SignIn
                  isOpen={isOpenSignIn}
                  onClose={onCloseSignIn}
                  onOpenSignUp={onOpenSignUp}
                />
                <SignUp isOpen={isOpenSignUp} onClose={onCloseSignUp} />
              </>
            )}
          </ButtonGroup>
        </Flex>
      </header>

      <Box mt='64px'>
        <Outlet />
      </Box>
    </div>
  );
}
