import React from 'react';
import { VStack, Heading, Button, Container } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RiErrorWarningFill } from 'react-icons/ri';
const NotFound = () => {
  return (
    <Container h={'92vh'}>
      <VStack justifyContent={'center'} h={'full'} spacing={'4'}>
        <RiErrorWarningFill fontSize={'xxx-large'} color="" />
        <Heading textTransform={'uppercase'} textAlign={'center'}>
          Page Not Found
        </Heading>

        <Link to={'/'}>
          <Button variant={'ghost'}>Go To Home</Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default NotFound;
