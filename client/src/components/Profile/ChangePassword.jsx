import React, { useEffect, useState } from 'react';
import { VStack, Heading, Button, Input, Container } from '@chakra-ui/react';
import  { toast } from 'react-hot-toast';
import {useDispatch,useSelector} from "react-redux"
import { changePassword } from '../../redux/actions/profileAction';
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const dispatch = useDispatch()
  const onSubmitHandler = e => {
    e.preventDefault();
    dispatch(changePassword(oldPassword,newPassword))
   
  };
const {loading,message,error} = useSelector((state)=>state.profile)
  useEffect(()=>{
if(error){
  toast.error(error)
  dispatch({type:"clearError"})
}
if(message){
  toast.success(message)
  dispatch({type:"clearMessage"})
}
  },[dispatch,error,message])
  return (
    <Container py={'16'} minH={'90vh'}>
      <form onSubmit={onSubmitHandler}>
        <Heading my={'16'} textAlign={['center', 'left']}>
          Change Password
        </Heading>
        <VStack spacing={8}>
          <Input
            required
            id="oldPassword"
            value={oldPassword}
            type="password"
            placeholder="Enter  your old password"
            onChange={e => setOldPassword(e.target.value)}
            focusBorderColor="yellow.500"
          />
          <Input
            required
            id="newPassword"
            value={newPassword}
            type="password"
            placeholder="Enter  your new password"
            onChange={e => setNewPassword(e.target.value)}
            focusBorderColor="yellow.500"
          />
          <Button isLoading={loading} w={'full'} colorScheme="yellow" type="submit">
            Change Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ChangePassword;
