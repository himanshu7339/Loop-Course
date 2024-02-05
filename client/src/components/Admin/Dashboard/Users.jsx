import React from 'react';

import {
  Box,
  Grid,
  Container,
  Heading,
  VStack,
  Input,
  Select,
  Image,
  Button,
  Table,
  HStack,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
const Users = () => {
  const users = [
    {
      _id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      description: 'System Administrator with full access',
      subscription: {
        status: 'Active',
      },
    },
    {
      _id: 2,
      name: 'Alice Johnson',
      email: 'alice.j@example.com',
      role: 'Editor',
      description: 'Content editor responsible for article management',
      subscription: {
        status: 'Active',
      },
    },
    {
      _id: 3,
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      role: 'User',
      description: 'Regular user with basic access',
      subscription: {
        status: 'Inactive',
      },
    },
    {
      _id: 4,
      name: 'Emma White',
      email: 'emma.white@example.com',
      role: 'Viewer',
      description: 'Limited access to view content',
      subscription: {
        status: 'Active',
      },
    },
    {
      _id: 5,
      name: 'Charlie Brown',
      email: 'charlie.b@example.com',
      role: 'Moderator',
      description: 'Moderator with content moderation responsibilities',
      subscription: {
        status: 'Active',
      },
    },
    {
      _id: 6,
      name: 'Grace Miller',
      email: 'grace.m@example.com',
      role: 'User',
      description: 'Regular user with additional permissions',
      subscription: {
        status: 'Inactive',
      },
    },
    {
      _id: 7,
      name: 'Daniel Green',
      email: 'daniel.g@example.com',
      role: 'Editor',
      description: 'Content editor specializing in multimedia content',
      subscription: {
        status: 'Active',
      },
    },
    {
      _id: 8,
      name: 'Olivia Brown',
      email: 'olivia.b@example.com',
      role: 'Admin',
      description: 'System Administrator managing user accounts',
      subscription: {
        status: 'Active',
      },
    },
    {
      _id: 9,
      name: 'Liam Davis',
      email: 'liam.d@example.com',
      role: 'User',
      description: 'New user with limited access',
      subscription: {
        status: 'Inactive',
      },
    },
    {
      _id: 10,
      name: 'Ava Wilson',
      email: 'ava.w@example.com',
      role: 'Viewer',
      description: 'Viewer with access to specific content categories',
      subscription: {
        status: 'Active',
      },
    },
  ];

  const updateUserHandler = (userId) =>{
console.log(userId)
  }

  const deleteUserHandler = (userId) =>{
    console.log(userId)
  }
  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
      <Box p={['0', '16']} overflowX={'auto'}>
        <Heading
          textTransform={'uppercase'}
          children="All Users"
          my={'16'}
          textAlign={['center', 'left']}
        />

        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size={'lg'}>
            <TableCaption>All Available</TableCaption>

            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Subscription</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map(items => {
                return (
                  <Row
                    key={items._id}
                    deleteUserHandler={deleteUserHandler}
                    updateUserHandler={updateUserHandler}
                    
                    _id={items._id}
                    name={items.name}
                    email={items.email}
                    role={items.role}
                    subscription={items.subscription.status}
                  />
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Sidebar />
    </Grid>
  );
};

export default Users;

function Row({
  name,
  email,
  role,
  _id,
  subscription,
  updateUserHandler,
  deleteUserHandler,
}) {
  return (
    <Tr>
      <Td>{_id}</Td>
      <Td>{name}</Td>
      <Td>{email}</Td>
      <Td>{role}</Td>
      <Td>{subscription === 'Active' ? 'Active' : 'Not Active'}</Td>

      <Td>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => updateUserHandler(_id)}
            variant={'outline'}
            color={'purple.500'}
          >
            Change Role
          </Button>
          <Button onClick={() => deleteUserHandler(_id)} color={'purple.600'}>
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
