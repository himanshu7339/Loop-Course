import React, { useEffect } from 'react';

import {
  Box,
  Grid,
  Heading,
  Button,
  Table,
  HStack,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers, updateUserRole } from '../../../redux/actions/adminAction';
import Loader from '../../Layout/Loader';
const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error, message } = useSelector(state => state.admin);

  const updateUserHandler = userId => {
    dispatch(updateUserRole(userId))
  };

  const deleteUserHandler = userId => {
    console.log(userId)
    dispatch(deleteUser(userId))
  };

  useEffect(() => {
    dispatch(getAllUsers());
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);
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
                {users &&
                  users.map(items => {
                    return (
                      <Row
                        key={items._id}
                        deleteUserHandler={deleteUserHandler}
                        updateUserHandler={updateUserHandler}
                        _id={items._id}
                        loading={loading}
                        name={items.name}
                        email={items.email}
                        role={items.role}
                        subscription={
                          items.subscription &&
                          items.subscription.status === 'active'
                            ? 'Active'
                            : 'Not Active'
                        }
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
  loading
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
            isLoading={loading}
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
