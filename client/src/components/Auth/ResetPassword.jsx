import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { VStack, Heading, Button, Input, Container } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/profileAction';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const params = useSearchParams();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(state => state.profile);
  const submitHandler = e => {
    e.preventDefault();
    dispatch(resetPassword(params.token, password));
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
  }, [error, message, dispatch]);
  return (
    <Container py={'16'} h={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          children="Reset Password"
          my={'16'}
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />
        <VStack spacing={'8'}>
          <Input
            id="email"
            required
            value={password}
            placeholder="New Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            focusBorderColor="yellow.500"
          />
          <Button
            isLoading={loading}
            type="submit"
            w={'full'}
            colorScheme="yellow"
          >
            Change Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
