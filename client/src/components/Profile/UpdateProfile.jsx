import React, { useEffect, useState } from 'react';
import { VStack, Heading, Button, Input, Container } from '@chakra-ui/react';
import { updateProfile } from '../../redux/actions/profileAction';
import { getMyProfile } from '../../redux/actions/userAction';
import  { toast } from 'react-hot-toast';
import {useDispatch,useSelector} from "react-redux"
const UpdateProfile = ({user}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
const dispatch = useDispatch()
  const onSubmitHandler = async e => {
    e.preventDefault();
  dispatch(updateProfile(name,email))
  dispatch(getMyProfile)
   
  };

  const { loading, message, error } = useSelector(state => state.profile);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);



  const removeFromPlaylistHandler = id => {
    console.log(id);
  };
  return (
    <Container py={'16'} minH={'90vh'}>
      <form onSubmit={onSubmitHandler}>
        <Heading
          my={'16'}
          textAlign={['center', 'left']}
          textTransform={'uppercase'}
        >
          Update Profile
        </Heading>
        <VStack spacing={8}>
          <Input
            value={name}
            type="text"
            placeholder="Name"
            onChange={e => setName(e.target.value)}
            focusBorderColor="yellow.500"
          />
          <Input
            value={email}
            type="email"
            placeholder="Email Address"
            onChange={e => setEmail(e.target.value)}
            focusBorderColor="yellow.500"
          />
          <Button isLoading={loading} w={'full'} colorScheme="yellow" type="submit">
            Update Profile
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
