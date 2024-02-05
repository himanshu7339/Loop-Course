import React, { useState } from 'react';
import { VStack, Heading, Button, Input, Container } from '@chakra-ui/react';
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  return (
    <Container py={'16'} minH={'90vh'}>
      <form>
        <Heading my={'16'} textAlign={['center', 'left']}>
          Change Password
        </Heading>
        <VStack spacing={8}>
          <Input
            required
            id="oldPassword"
            value={oldPassword}
            type="password"
            placeholder="Enter  your old password"
            onChange={e => setOldPassword(e.target.value)}
            focusBorderColor="yellow.500"
          />
          <Input
            required
            id="newPassword"
            value={newPassword}
            type="password"
            placeholder="Enter  your new password"
            onChange={e => setNewPassword(e.target.value)}
            focusBorderColor="yellow.500"
          />
          <Button w={'full'} colorScheme="yellow" type="submit">
            Change Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ChangePassword;
