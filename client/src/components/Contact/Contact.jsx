import React, { useEffect, useState } from 'react';
import {
  VStack,
  Heading,
  Button,
  Box,
  Input,
  Container,
  FormLabel,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { contactUs } from '../../redux/actions/otherAction';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  const onsubmitHandler = e => {
    e.preventDefault();
    dispatch(contactUs(name, email, message));
  };
  const { error, message:msg } = useSelector(state => state.other);
  console.log(msg)
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (msg) {
      toast.success(msg);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, msg]);
  return (
    <Container h={'92vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={16}>
        <Heading children="Request Your Course " />
        <form onSubmit={onsubmitHandler} style={{ width: '100%' }}>
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
            <FormLabel htmlFor="message" children="Message" />
            <textarea
              style={{
                width: '-webkit-fill-available',
                border: '1px solid',
                padding: '1rem',
              }}
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
  );
};

export default Contact;
