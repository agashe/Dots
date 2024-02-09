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
  Switch,
  Text,
  HStack,
  Show,
  Hide,
  useColorMode,
  useColorModeValue,
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
  MdMenu,
} from "react-icons/md";
import { Outlet, Link as ReactRouterLink } from "react-router-dom";
import { SignIn } from "./auth/SignIn";
import { SignUp } from "./auth/SignUp";
import { SideMenu } from "./SideMenu";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { SearchModal } from "./SearchModel";


export function Layout() {
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchKeyword, setSearchKeyword] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.50', 'gray.800');

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

  const {
    isOpen: isOpenSideMenu,
    onOpen: onOpenSideMenu,
    onClose: onCloseSideMenu,
  } = useDisclosure();

  const {
    isOpen: isOpenSearchModal,
    onOpen: onOpenSearchModal,
    onClose: onCloseSearchModal,
  } = useDisclosure();

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
          backgroundColor: bg === 'gray.50' ? '#f7fafc': '#1a202c',
          zIndex: "10",
        }}
      >
        <Flex
          minWidth='max-content'
          alignItems='center'
          gap='2'
          px={{ md: 1, lg: 14 }}
          py={1}
          borderBottom='1px'
          borderColor='brand.main'
        >
          <Link reloadDocument
            _hover={{ textDecoration: "none" }}
            width={{ md: '15%' }}
          >
            <div className='logo'>
              <Show below='md'>
                <Tooltip label={t('search')}>
                  <>
                    <IconButton
                      colorScheme='brand'
                      icon={<Icon as={MdMenu} boxSize={{ base: 4, md: 6 }} />}
                      boxSize={{ base: 7, md: 10 }}
                      minW={{ base: 7, md: 10 }}
                      mx={1}
                      mb={1}
                      onClick={onOpenSideMenu}
                    />
                    <SideMenu isOpen={isOpenSideMenu} onClose={onCloseSideMenu} />
                  </>
                </Tooltip>
              </Show>

              <span onClick={() => { window.location.href = '/'; }}>
                D<span className='red-dot'></span>TS...
              </span>
            </div>
          </Link>

          <Spacer />

          <Hide below='lg'>
            <Flex width='40%'>
              <Input placeholder={t('search')} onChange={handleSearchInput} />
              <IconButton
                colorScheme='brand'
                icon={<Icon as={MdSearch} boxSize={6} />}
                ml='2'
                onClick={submitSearch}
              />
            </Flex>
          </Hide>

          <Spacer />

          <ButtonGroup
            gap={{ base: '1', md: '2' }}
            width='17%'
            justifyContent='right'
            alignItems='center'
            paddingRight='2px'
          >
            {user ? (
              <>
                <Show below='lg'>
                  <Tooltip label={t('search')}>
                    <IconButton
                      colorScheme='brand'
                      icon={<Icon as={MdSearch} boxSize={{ base: 4, md: 6 }} />}
                      boxSize={{ base: 7, md: 10 }}
                      minW={{ base: 7, md: 10 }}
                      onClick={onOpenSearchModal}
                    />
                  </Tooltip>
                  <SearchModal isOpen={isOpenSearchModal} onClose={onCloseSearchModal} />
                </Show>

                <Tooltip label={t('notifications')}>
                  <IconButton
                    as='a'
                    href='/notifications'
                    colorScheme='brand'
                    position='relative'
                    boxSize={{ base: 7, md: 10 }}
                    minW={{ base: 7, md: 10 }}
                    icon={
                      <>
                        <Icon as={MdNotifications} boxSize={{ base: 4, md: 6 }} />
                        <Box
                          as={"span"}
                          color={"black"}
                          position={"absolute"}
                          top={"-3px"}
                          left={{ base: '15px', md: '25px' }}
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

                <Hide below='lg'>
                  <Tooltip label={t('actions.create_post')}>
                    <IconButton
                      as='a'
                      href='/create-post'
                      colorScheme='brand'
                      icon={<Icon as={MdAdd} boxSize={6} />}
                    />
                  </Tooltip>
                </Hide>

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
                        boxSize={{ base: 7, md: 10 }}
                        size={{ base: 'sm', md: 'md' }}
                      />
                    }
                    variant='ghost'
                    _focus={{ bg: "none" }}
                    _hover={{ bg: "none" }}
                    boxSize={{ base: 7, md: 10 }}
                    minW={{ base: 7, md: 10 }}
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
                      icon={<Icon as={MdDarkMode} boxSize={5} />}
                      iconSpacing={2}
                      onClick={toggleColorMode}
                    >
                      <HStack spacing={5}>
                        <Text>{t('dark_mode')}</Text>
                        {
                          (colorMode === 'light') ?
                            <Switch colorScheme="brand" isInvalid />
                            :
                            <Switch colorScheme="brand" isChecked />
                        }
                      </HStack>
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

      <Box mt='64px' bg={bg}>
        <Outlet />
      </Box>
    </div>
  );
}
