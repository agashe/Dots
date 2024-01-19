import {
  Flex,
  Spacer,
  Box,
  ButtonGroup,
  Button,
  Input,
  IconButton,
  Icon
} from '@chakra-ui/react';

import { MdSearch, MdDarkMode } from 'react-icons/md'

import { Outlet } from "react-router-dom";

export function Layout() {
  // function signOut() {
  //   localStorage.removeItem('user');

  //   window.location.href = "/";
  // }

  return (
    <div>
      <header> 
        <Flex minWidth='max-content' alignItems='center' gap='2' px={2} py={1} border='1px' borderColor='gray.200'>
          <Box>
            <div className='logo'>
              D<span className='red-dot'></span>TS
            </div>
          </Box>
          
          <Spacer />

          <Flex width='30%'>
            <Input placeholder='Search ...' />
            <IconButton colorScheme='brand' icon={<Icon as={MdSearch} boxSize={6} />} ml='2' />
          </Flex>

          <Spacer />

          <ButtonGroup gap='2'>
            <IconButton colorScheme='brand' icon={<Icon as={MdDarkMode} boxSize={6} />} />

            {
              localStorage.getItem('user') ?
                <>
                  <Button colorScheme='brand'>Profile</Button>
                  <Button colorScheme='brand'>Sign Out</Button>
                </>
                :
                <Button colorScheme='brand'>Sign In</Button>
            }          
          </ButtonGroup>
        </Flex>
      </header>

      <Outlet />
    </div>
  );
}