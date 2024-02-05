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
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const params = useSearchParams()
    console.log(params.token)
  return (
    <Container py={"16"} h={"90vh"}>
      <form>
        <Heading
          children="Reset Password"
          my={'16'}
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />
        <VStack spacing={"8"}>
        <Input
              id="email"
              required
              value={password}
              placeholder="New Password"
              type="password"
              onChange={e => setPassword(e.target.value)}
              focusBorderColor="yellow.500"
            />
            <Button type='submit' w={"full"} colorScheme='yellow'>Change Password</Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;