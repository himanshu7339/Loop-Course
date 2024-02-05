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

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
  return (
    <Container py={"16"} h={"90vh"}>
      <form>
        <Heading
          children="Forget Password"
          my={'16'}
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />
        <VStack spacing={"8"}>
        <Input
              id="email"
              required
              value={email}
              placeholder="example@gmail.com"
              type="email"
              onChange={e => setEmail(e.target.value)}
              focusBorderColor="yellow.500"
            />
            <Button type='submit' w={"full"} colorScheme='yellow'>Send Reset Link</Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgetPassword;
