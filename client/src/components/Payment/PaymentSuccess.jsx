import React from 'react';
import {
  VStack,
  Heading,
  Text,
  Button,
  Box,
  Container,
} from '@chakra-ui/react';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
const PaymentSuccess = () => {
  return (
    <Container h={'92vh'}>
      <Heading textTransform={'uppercase'} my={'8'} textAlign={'center'}>
        You have pro pack
      </Heading>
      <VStack boxShadow={'lg'} alignItems={'center'} borderRadius={'lg'}>
        <Box
          w={'full'}
          bg={'yellow.400'}
          p={'4'}
          css={{ borderRadius: '8px 8px 0 0 ' }}
        >
          <Text color={'Black'} children="Payment Success" />
        </Box>

        <Box p={'4'}>
          <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
            <Text children="Congratulation You're a pro member you can access premium content" />
            <Heading
              fontSize={'xxx-large'}
              color={'green'}
              children={<RiCheckboxCircleFill />}
            />
          </VStack>
        </Box>

        <Link to={'/profile'}>
          <Button variant={'ghost'}>Go To Profile</Button>
        </Link>
        <Heading p={'4'} size={'xs'}>
          Reference No : 457294792749857
        </Heading>
      </VStack>
    </Container>
  );
};

export default PaymentSuccess;
