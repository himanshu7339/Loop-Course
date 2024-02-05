import React from 'react';
import { VStack, Heading, Button, Container } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RiErrorWarningFill } from 'react-icons/ri';
const PaymentFail = () => {
  return (
    <Container h={'92vh'}>
      <VStack justifyContent={'center'} h={'full'} spacing={'4'}>
        <RiErrorWarningFill fontSize={'xxx-large'} color="red" />
        <Heading textTransform={'uppercase'} textAlign={'center'}>
          Oh no, your payment failed
        </Heading>
        <Heading size={"4"} fontWeight={""}>Don't worry. You can retry your payment in the next few minutes</Heading>

        <Link to={'/subscribe'}>
          <Button variant={'ghost'}>Try again</Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default PaymentFail