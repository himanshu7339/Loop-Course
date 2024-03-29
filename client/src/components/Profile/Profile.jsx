import React, { useEffect, useState } from 'react';
import {
  Stack,
  HStack,
  VStack,
  Heading,
  Text,
  Button,
  Image,
  Input,
  Container,
  Avatar,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RiDeleteBin7Fill } from 'react-icons/ri';

import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import {
  removeFromPlaylist,
  updateProfilePicture,
} from '../../redux/actions/profileAction';
import {
  cancelSubscription,
  getMyProfile,
} from '../../redux/actions/userAction';
const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(state => state.profile);
  const {
    loading: subscriptionLoading,
    message: subscriptionMessage,
    error: subscriptionError,
  } = useSelector(state => state.subscription);

  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    console.log(image)
    const myForm = new FormData();
    myForm.append('file', image);
    await dispatch(updateProfilePicture(myForm));
    dispatch(getMyProfile());
  };

  const cancelSubscriptionHandler = () => {
    dispatch(cancelSubscription());
    
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (subscriptionError) {
      toast.error(subscriptionError);
      dispatch({ type: 'clearError' });
    }
    if (subscriptionMessage) {
      toast.success(subscriptionMessage);
      dispatch({ type: 'clearMessage' });
    }
   
  }, [dispatch, error, message,subscriptionError,subscriptionMessage]);

  const removeFromPlaylistHandler = async id => {
    await dispatch(removeFromPlaylist(id));
    dispatch(getMyProfile());
  };
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
          <Avatar boxSize={'48'} src={user.avatar.url} />
          <Button
            colorScheme="yellow"
            variant={'ghost'}
            onClick={onOpen}
            isLoading={loading}
          >
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
            <Text>{user.createdAt.split('T')[0]}</Text>
          </HStack>

          {user.role !== 'admin' && (
            <HStack>
              <Text fontWeight={'bold'}>Subscription</Text>
              {user.subscription && user.subscription.status === 'active' ? (
                <Button
                  onClick={cancelSubscriptionHandler}
                  color={'yellow.500'}
                  variant={'unstyled'}
                  isLoading={subscriptionLoading}
                >
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
              <VStack w={'48'} m={'2'} key={playlist._id}>
                <Image
                  boxSize={'full'}
                  objectFit={'contain'}
                  src={playlist.poster}
                />
                <HStack>
                  <Link to={`/course/${playlist.course}`}>
                    <Button variant={'ghost'} colorScheme={'yellow'}>
                      Watch Now
                    </Button>
                  </Link>
                  <Button
                    onClick={() => removeFromPlaylistHandler(playlist.course)}
                  >
                    <RiDeleteBin7Fill />
                  </Button>
                </HStack>
              </VStack>
            );
          })}
        </Stack>
      )}

      <ChangePhotoBox
        isOpen={isOpen}
        onClose={onClose}
        changeImageSubmitHandler={changeImageSubmitHandler}
        loading={loading}
      />
    </Container>
  );
};

export default Profile;

function ChangePhotoBox({
  isOpen,
  onClose,
  changeImageSubmitHandler,
  loading,
}) {
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
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={closeHandler}>
        <ModalOverlay backdropFilter={'blur(10px)'} />
        <ModalContent>
          <ModalHeader>Change Photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container>
              <form
                onSubmit={e => changeImageSubmitHandler(e, image)}
                enctype="multipart/form-data"
              >
                <VStack spacing={'8'}>
                  {imagePrev && <Avatar boxSize={'48'} src={imagePrev} />}
                  <Input
                    type="file"
                    accept="image/*"
                    name="file"
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
                  <Button
                    w={'full'}
                    colorScheme="yellow"
                    type="submit"
                    isLoading={loading}
                  >
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
