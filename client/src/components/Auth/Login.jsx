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
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Container h={'95vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'16px'}>
        <Heading children="Welcome to CourseBundler" />
        <form style={{ width: '100%' }}>
          <Box my={'4'}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              id="email"
              value={email}
              placeholder="Example@gamil.com"
              onChange={e => setEmail(e.target.value)}
              focusBorderColor="yellow.500"
            />
          </Box>

          <Box my={'4'}>
            <FormLabel htmlFor="password" children="Password" />
            <Input
              id="password"
              type='password'
              value={password}
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box>
            <Link to={'/forgetpassword'}>
              <Button fontSize={'sm'} variant={'link'}>
                Forget Password
              </Button>
            </Link>
          </Box>

          <Button my={'4'} colorScheme="yellow" type="submit">
            Login
          </Button>
          <Box my={'4'}>
            New User ?{' '}
            <Link to={'/register'}>
              <Button variant={'link'} colorScheme="yellow">
                Sign Up
              </Button>
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Login;
