import React, { useState } from 'react'
import { VStack, Heading, Button, Input, Container } from '@chakra-ui/react';
const UpdateProfile = () => {
  const  [name,setName]=useState("")
  const  [email,setEmail]=useState("")
  return (
    <Container py={'16'} minH={'90vh'}>
    <form>
      <Heading my={'16'} textAlign={['center', 'left']} textTransform={"uppercase"}>
        Update Profile
      </Heading>
      <VStack spacing={8}>
        <Input
          value={name}
          type="text"
          placeholder="Name"
          onChange={e => setName(e.target.value)}
          focusBorderColor="yellow.500"
        />
        <Input
          value={email}
          type="email"
          placeholder="Email Address"
          onChange={e => setEmail(e.target.value)}
          focusBorderColor="yellow.500"
        />
        <Button w={"full"} colorScheme='yellow' type='submit'>Update Profile</Button>
      </VStack>
    </form>
  </Container>
  )
}

export default UpdateProfile