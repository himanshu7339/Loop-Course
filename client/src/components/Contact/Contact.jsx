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

const Contact = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    
  return (
    <Container h={"92vh"}>
<VStack h={"full"} justifyContent={"center"}
spacing={16}>
    <Heading children="Request Your Course "/>
    <form style={{ width: '100%' }}>
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

          <Box my={'4'} >
            <FormLabel htmlFor="message" children="Message" />
            <textarea
                style={{ width: '-webkit-fill-available',border:"1px solid", padding:"1rem"}}
              id="message"
              value={message}
              required
              placeholder="message.."
              onChange={e => setMessage(e.target.value)}
              focusBorderColor="yellow.500"
            />
          </Box>


          <Button my={'4'} colorScheme="yellow" type="submit">
           Send mail
          </Button>
          <Box my={'4'}>
            Request for a course ?{' '}
            <Link to={'/request'}>
              <Button variant={'link'} colorScheme="yellow">
                Click here
              </Button>
            </Link>
          </Box>
        </form>
</VStack>
    </Container>
  )
}

export default Contact