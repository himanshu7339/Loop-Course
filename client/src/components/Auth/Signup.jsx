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
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');
  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };
  return (
    <Container h={'95vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'16px'}>
        <Heading children="Sign Up" textTransform={'uppercase'} />
        <form style={{ width: '100%' }}>
          <Box my={'4'} display={'flex'} justifyContent={'center'}>
            <Avatar src={imagePrev} size={'2xl'} />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="name" children="Name" />
            <Input
              id="name"
              required
              value={name}
              placeholder="John Smith"
              type="text"
              onChange={e => setName(e.target.value)}
              focusBorderColor="yellow.500"
            />
          </Box>

          <Box my={'4'}>
            <FormLabel htmlFor="email" children="Email" />
            <Input
              id="email"
              required
              value={email}
              placeholder="example@gmail.com"
              type="email"
              onChange={e => setEmail(e.target.value)}
              focusBorderColor="yellow.500"
            />
          </Box>

          <Box my={'4'}>
            <FormLabel htmlFor="password" children="Password" />
            <Input
              id="password"
              value={password}
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              focusBorderColor="yellow.500"
            />
          </Box>

          <Box my={'4'}>
            <FormLabel htmlFor="chooseAvatar" children="Choose Avatar" />
            <Input
              id="chooseAvatar"
              type="file"
              accept="image/*"
              placeholder="avatar"
              onChange={changeImageHandler}
              focusBorderColor="yellow.500"
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
            />
          </Box>

          <Button my={'4'} colorScheme="yellow" type="submit">
            Sign Up
          </Button>
          <Box my={'4'}>
            You have already account ?{' '}
            <Link to={'/login'}>
              <Button variant={'link'} colorScheme="yellow">
                Login
              </Button>
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Signup;
