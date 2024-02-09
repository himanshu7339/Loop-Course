import React from 'react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import {useDispatch} from "react-redux"

import {
  HStack,
  VStack,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from '@chakra-ui/react';
import { RiDashboardFill, RiHomeSmileLine, RiLogoutBoxFill, RiMenu5Fill } from 'react-icons/ri';
import { BsCameraVideo } from "react-icons/bs";
import { TiArrowBack } from "react-icons/ti";
import { MdContactPhone  } from "react-icons/md";

import { Link } from 'react-router-dom';
import { logoutUser } from '../../redux/actions/userAction';
const Header = ({ isAuthenticated = false, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

 
const dispatch = useDispatch()
  const logoutHandler = e => {
    onClose()
    dispatch(logoutUser())
  };
  return (
    <>
      <ColorModeSwitcher />
      <Button
        onClick={onOpen}
        colorScheme="yellow"
        width={'12'}
        height={'12'}
        rounded={'full'}
        position={'fixed'}
        top={'6'}
        left={'6'}
        zIndex={'overlay'}
      >
        <RiMenu5Fill />
      </Button>

      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay backdropFilter={'blur(2px)'} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>Loop Course</DrawerHeader>
          <DrawerBody>
            <VStack spacing={'4'} alignItems={'flex-start'} >
              <Link to={'/'}>
                
                <Button variant={'ghost'} gap={"2"}><RiHomeSmileLine /> Home</Button>
              </Link>
              <Link to={'/courses'}>
                <Button variant={'ghost'} gap={"2"}><BsCameraVideo /> Courses</Button>
              </Link>
              <Link to={'/request'}>
                <Button variant={'ghost'} gap={"2"}><TiArrowBack/>Request a Course </Button>
              </Link>
              <Link to={'/contact'}>
                <Button variant={'ghost'} gap={"2"}><MdContactPhone  />Contact Us</Button>
              </Link>
              <Link to={'/about'}>
                <Button variant={'ghost'} gap={"2"}>About Us</Button>
              </Link>

              <HStack
                justifyContent={'space-evenly'}
                position={'absolute'}
                bottom={'2rem'}
                width={'80%'}
              >
                {isAuthenticated ? (
                  <>
                    <VStack>
                      <HStack>
                        <Link to={'/profile'}>
                          <Button variant={'ghost'} colorScheme={'yellow'}>
                            Profile
                          </Button>
                        </Link>
                        <Button variant={'ghost'} onClick={logoutHandler}>
                          <RiLogoutBoxFill
                            style={{ margin: '4px', fontSize: '20px' }}
                          />{' '}
                          Logout
                        </Button>
                      </HStack>
                      {user && user.role === 'admin' && (
                        <Link to={'/admin/dashboard'}>
                          <Button colorScheme="purple" variant={'ghost'}>
                            <RiDashboardFill style={{ margin: '4px' }} />{' '}
                            Dashboard
                          </Button>
                        </Link>
                      )}
                    </VStack>
                  </>
                ) : (
                  <>
                    <Link to={'/login'}>
                      <Button colorScheme={'yellow'}>Login</Button>
                    </Link>
                    <p>OR</p>
                    <Link to={'/signup'}>
                      <Button colorScheme={'yellow'}>Register</Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
