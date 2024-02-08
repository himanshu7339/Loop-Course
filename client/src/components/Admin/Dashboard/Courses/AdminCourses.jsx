import React, { useEffect, useState } from 'react';

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
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModel from './CourseModel';
import { toast } from 'react-hot-toast';
import {
  getAllCourseLectures,
  getAllCourses,
} from '../../../../redux/actions/courseAction';
import { addLecture, deleteCourse, deleteLecture } from '../../../../redux/actions/adminAction';

const AdminCourses = () => {
  const { courses, lectures } = useSelector(state => state.courses);
  const { loading, error, message } = useSelector(state => state.admin);

  const dispatch = useDispatch();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [courseId,setCourseId] = useState("")
  const [courseTitle,setCourseTitle] = useState("")
  const courseDetailsHandler = (courseId,title) => {
    dispatch(getAllCourseLectures(courseId));
    onOpen();
    setCourseId(courseId)
    setCourseTitle(title)
  };

  const deleteCourseHandler = courseId => {
    dispatch(deleteCourse(courseId));
  };

  const deleteLectureButtonHandler = async(courseId, lectureId) => {
   await dispatch(deleteLecture(courseId,lectureId))
   dispatch(getAllCourseLectures(courseId))
  };

  const addLectureButtonHandler = async(e, courseId, title, description, video) => {
    e.preventDefault()
    const myForm = new FormData();
    myForm.append("title",title)
    myForm.append("description",description)
    myForm.append("file",video)
  await  dispatch(addLecture(courseId,myForm));
    dispatch(getAllCourseLectures(courseId))
    
  };

  useEffect(() => {
   
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    dispatch(getAllCourses());
  }, [dispatch, error, message]);
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
              {courses &&
                courses.map(items => {
                  return (
                    <Row
                      key={items._id}
                      deleteUserHandler={deleteCourseHandler}
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
          addLectureButtonHandler={addLectureButtonHandler}
          id={courseId}
          courseTitle={courseTitle}
          lectures={lectures}
          loading={loading}
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
  loading,
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
            onClick={() => courseDetailsHandler(_id,title)}
            variant={'outline'}
            color={'purple.500'}
          >
            View Lecture
          </Button>
          <Button
            isLoading={loading}
            onClick={() => deleteUserHandler(_id)}
            color={'purple.600'}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
