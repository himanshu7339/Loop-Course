import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import {
  VStack,
  Heading,
  Text,
  Button,
  Box,
  Container,
} from '@chakra-ui/react';
import axios from 'axios';
import { server } from '../../redux/store';
import { buySubscription } from '../../redux/actions/userAction';
const Subscribe = ({ user }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState('');
  const { loading, error, subscriptionId } = useSelector(
    state => state.subscription
  );

  const { error: courseError } = useSelector(state => state.courses);

  const subscriptionHandler = async () => {
    const {
      data: { key },
    } = await axios.get(`${server}/razorpaykey`);
    setKey(key);
    dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }

    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          name: 'Loop Course',
          description: 'Get access to all premium content',
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,

          prefill: {
            name: user.name,
            email: user.email,
            contact: '',
          },

          notes: {
            address: 'Himanshu Office',
          },
          theme: {
            color: '#FFC00',
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      };

      openPopUp();
    }
  }, [
    dispatch,
    error,
    user.name,
    user.email,
    key,
    subscriptionId,
    courseError,
  ]);
  return (
    <Container h={'90vh'} p={'16'}>
      <Heading children="Welcome" my={'8'} textAlign={'center'} />
      <VStack
        boxShadow={'lg'}
        alignItems={'stretch'}
        borderRadius={'lg'}
        spacing={'0'}
      >
        <Box bg={'yellow.400'} p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
          <Text color={'Black'} children="Pro Pack - ₹299.00" />
        </Box>
        <Box p={'4'}>
          <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
            <Text children="Join Pro Loop Course And Get Access to All Content" />
            <Heading size={'md'} children="₹299.00 Only" />
          </VStack>

          <Button
            onClick={subscriptionHandler}
            my={'8'}
            w={'full'}
            colorScheme="yellow"
            isLoading={loading}
          >
            Buy Now
          </Button>
        </Box>

        <Box
          bg={'#B2A59B'}
          p={'4'}
          spacing="8px"
          css={{ borderRadius: '0 0 8px 8px' }}
        >
          <Heading
            children="100% refund at cancellation"
            fontSize={'large'}
            color={'white'}
          />
          <Text
            fontSize={'xs'}
            color={'white'}
            children="*Terms & Conditions Apply"
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
