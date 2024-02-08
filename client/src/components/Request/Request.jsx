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
import { courseRequest } from '../../redux/actions/otherAction';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
const Request = () => {
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const onsubmitHandler = e => {
    e.preventDefault();
    dispatch(courseRequest(name, email, course));
  };
  const { error, message: otherMessage } = useSelector(state => state.other);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (otherMessage) {
      toast.success(otherMessage);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, otherMessage]);
  return (
    <Container h={'92vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={16}>
        <Heading children="Contact Us" />
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
            <FormLabel htmlFor="course" children="Message" />
            <textarea
              style={{
                width: '-webkit-fill-available',
                border: '1px solid',
                padding: '1rem',
              }}
              id="course"
              value={course}
              required
              placeholder="Write course.."
              onChange={e => setCourse(e.target.value)}
              focusBorderColor="yellow.500"
            />
          </Box>

          <Button my={'4'} colorScheme="yellow" type="submit">
            Send mail
          </Button>
          <Box my={'4'}>
            Explore available courses{' '}
            <Link to={'/courses'}>
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

export default Request;
