import React from 'react';
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
const Subscribe = () => {
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

          <Button my={'8'} w={'full'} colorScheme="yellow">
            Buy Now
          </Button>
        </Box>

        <Box bg={'#B2A59B'} p={"4"} spacing="8px" css={{ borderRadius: '0 0 8px 8px' }}>
          <Heading
            children="100% refund at cancellation"
            fontSize={"large"}
            color={"white"}
            
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
