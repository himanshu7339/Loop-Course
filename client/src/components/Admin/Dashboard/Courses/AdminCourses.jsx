import React from 'react';

import {
  Box,
  Grid,
  Heading,
  Image,
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
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModel from './CourseModel';
const AdminCourses = () => {
  const Courses = [
    {
      title: 'Sample Title 1',
      poster: {
        url: 'https://images.pexels.com/photos/4497761/pexels-photo-4497761.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
      category: 'Action',
      _id: '1',
      views: 1000,
      createdBy: 'Himanshu',
      numOfVideos: 5,
    },
    {
      title: 'Sample Title 2',
      poster: {
        url: 'https://images.pexels.com/photos/4497761/pexels-photo-4497761.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
      category: 'Comedy',
      _id: '2',
      views: 1500,
      createdBy: 'Rahul',
      numOfVideos: 8,
    },
    {
      title: 'Sample Title 3',
      poster: {
        url: 'https://images.pexels.com/photos/4497761/pexels-photo-4497761.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
      category: 'Drama',
      _id: '3',
      views: 1200,
      createdBy: 'Vishal',
      numOfVideos: 6,
    },
    // Add more entries as needed
  ];
  const { isOpen, onClose, onOpen } = useDisclosure();
  const courseDetailsHandler = userId => {
    onOpen();
  };

  const deleteUserHandler = userId => {
    console.log(userId);
  };

  const deleteLectureButtonHandler = (courseId, lectureId) => {
    console.log(courseId);
    console.log(lectureId);
  };

  const addLectureButtonHandler = (e,courseId,title,description,video) => {
    e.preventDefault()
    console.log('add lecture');
  };

  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
      <Box p={['0', '8']} overflowX={'auto'}>
        <Heading
          textTransform={'uppercase'}
          children="All Users"
          my={'16'}
          textAlign={['center', 'left']}
        />

        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size={'lg'}>
            <TableCaption>All Available Courses</TableCaption>

            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lecture</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Courses.map(items => {
                return (
                  <Row
                    key={items._id}
                    deleteUserHandler={deleteUserHandler}
                    courseDetailsHandler={courseDetailsHandler}
                    _id={items._id}
                    title={items.title}
                    poster={items.poster}
                    category={items.category}
                    createdBy={items.createdBy}
                    numOfVideos={items.numOfVideos}
                    views={items.views}
                  />
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <CourseModel
          isOpen={isOpen}
          onClose={onClose}
          deleteButtonHandler={deleteLectureButtonHandler}
          add={addLectureButtonHandler}
          id={'dfhsuff'}
          courseTitle={'React Course'}
        />
      </Box>
      <Sidebar />
    </Grid>
  );
};

export default AdminCourses;

function Row({
  title,
  poster,
  category,
  _id,
  views,
  createdBy,
  numOfVideos,
  courseDetailsHandler,
  deleteUserHandler,
}) {
  return (
    <Tr>
      <Td>{_id}</Td>
      <Td>
        <Image src={poster.url} w={100} />
      </Td>
      <Td>{title}</Td>
      <Td textTransform={'uppercase'}>{category}</Td>
      <Td>{createdBy}</Td>
      <Td isNumeric>{views}</Td>
      <Td isNumeric>{numOfVideos}</Td>

      <Td>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => courseDetailsHandler(_id)}
            variant={'outline'}
            color={'purple.500'}
          >
            View Lecture
          </Button>
          <Button onClick={() => deleteUserHandler(_id)} color={'purple.600'}>
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
