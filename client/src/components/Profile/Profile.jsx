import React, { useState } from 'react';
import {
  Stack,
  HStack,
  VStack,
  Heading,
  Text,
  Button,
  Image,
  Box,
  Input,
  Container,
  FormLabel,
  Avatar,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
const Profile = () => {
  const user = {
    name: 'Himanshu',
    email: 'Himanshu@gmail.com',
    createAt: String(new Date().toISOString()),
    role: 'user',
    subscription: {
      status: undefined,
    },

    playlist: [
      {
        id: 1,
        title: 'Playlist 1',
        description: 'Playlist 1 description',
        image:
          'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
    ],
  };

  const removeFromPlaylistHandler = id => {
    console.log(id);
  };

  const changeImageSubmitHandler = (e,image) =>{
e.preventDefault()
console.log(image)
  }
 const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Container minH={'95vh'} maxH={'container.lg'} py={'8'}>
      <Heading m={'8'} textTransform={'uppercase'}>
        Profile
      </Heading>
      <Stack
        justifyContent={'flex-start'}
        direction={['column', 'row']}
        alignItems={'center'}
        spacing={['8', '16']}
      >
        <VStack>
          <Avatar boxSize={'48'} />
          <Button colorScheme="yellow" variant={'ghost'} onClick={onOpen}>
            Change Photo
          </Button>
        </VStack>

        <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
          <HStack>
            <Text fontWeight={'bold'}>Name</Text>
            <Text>{user.name}</Text>
          </HStack>
          <HStack>
            <Text fontWeight={'bold'}>Email</Text>
            <Text>{user.email}</Text>
          </HStack>
          <HStack>
            <Text fontWeight={'bold'}>Created At</Text>
            <Text>{user.createAt.split('T')[0]}</Text>
          </HStack>

          {user.role !== 'admin' && (
            <HStack>
              <Text fontWeight={'bold'}>Subscription</Text>
              {user.subscription.status === 'active' ? (
                <Button color={'yellow.500'} variant={'unstyled'}>
                  Cancel Subscription
                </Button>
              ) : (
                <Link to={'/subscribe'}>
                  <Button colorScheme="yellow">Subscribe</Button>
                </Link>
              )}
            </HStack>
          )}

          <Stack direction={['column', 'row']} alignItems={'center'}>
            <Link to={'/updateprofile'}>
              <Button>Update Profile</Button>
            </Link>
            <Link to={'/changepassword'}>
              <Button>Change Password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>

      <Heading size={'md'} my={'8'}>
        Playlist{' '}
      </Heading>
      {user.playlist.length > 0 && (
        <Stack
          direction={['column', 'row']}
          alignItems={'center'}
          flexWrap={'wrap'}
          p={4}
        >
          {user.playlist.map((playlist, index) => {
            return (
              <VStack w={'48'} m={'2'} key={playlist.id}>
                <Image
                  boxSize={'full'}
                  objectFit={'contain'}
                  src={playlist.image}
                />
                <HStack>
                  <Link to={`/course${playlist.id}`}>
                    <Button variant={'ghost'} colorScheme={'yellow'}>
                      Watch Now
                    </Button>
                  </Link>
                  <Button onClick={removeFromPlaylistHandler(playlist.id)}>
                    <RiDeleteBin7Fill />
                  </Button>
                </HStack>
              </VStack>
            );
          })}
        </Stack>
      )}

      <ChangePhotoBox isOpen={isOpen} onClose={onClose} changeImageSubmitHandler={changeImageSubmitHandler}  />
    </Container>
  );
};

export default Profile;

function ChangePhotoBox({isOpen,onClose,changeImageSubmitHandler}) {
    const [imagePrev, setImagePrev] = useState('');
    const [image, setImage] = useState('');
  const changeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };
  const closeHandler = () => {
    onClose();
    setImagePrev('');
    setImage('');
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={closeHandler}>
        <ModalOverlay backdropFilter={'blur(10px)'} />
        <ModalContent>
          <ModalHeader>Change Photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container>
              <form onSubmit={e=> changeImageSubmitHandler(e,image)}>
                <VStack spacing={'8'}>
                  {
                    imagePrev && <Avatar boxSize={'48'} src={imagePrev} />
                  }
                  <Input
                    type="file"
                    css={{
                      '&::file-selector-button': {
                        cursor: 'pointer',
                        marginLeft: '-5%',
                        width: '110%',
                        height: '100%',
                        color: '#ECC94B',
                        border: 'none',
                        background: 'white',
                      },
                    }}
                    onChange={changeImage}
                  />
                  <Button w={'full'} colorScheme="yellow" type="submit">
                    Change
                  </Button>
                </VStack>
              </form>
            </Container>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="yellow" mr={3} onClick={closeHandler}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
