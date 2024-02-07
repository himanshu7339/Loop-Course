import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import Loader from '../Layout/Loader';
import {
  Stack,
  HStack,
  Heading,
  Text,
  Button,
  Container,
  Input,
} from '@chakra-ui/react';
import CourseCard from './CourseCard';
import { getAllCourses } from '../../redux/actions/courseAction';
import { addToPlaylist, getMyProfile } from '../../redux/actions/userAction';
const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
 
  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home Decor',
    'Sports',
    'Beauty',
  ];
  const addToPlaylistHandler = async courseId => {
   await dispatch(addToPlaylist(courseId));
    dispatch(getMyProfile())
  };
  const { courses, loading, error, message } = useSelector(
    state => state.courses
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCourses(category, keyword));

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [category, keyword, dispatch, error, message]);

  return (
    <Container minH={'95vh'} maxW={'container.lg'} paddingY={'8'}>
      <Heading children="All Courses" m={'8'} />

      <Input
        focusBorderColor="yellow.500"
        placeholder="Search The Course"
        type="text"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />

      <HStack
        overflowX={'auto'}
        paddingY={'8'}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {categories.map((category, index) => {
          return (
            <Button
              minW={'60'}
              onClick={() => setCategory(category)}
              key={index}
            >
              {' '}
              <Text children="Category">{category}</Text>{' '}
            </Button>
          );
        })}
      </HStack>

      <Stack
        direction={['column', 'row']}
        flexWrap={'wrap'}
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        { courses.length > 0 ? (
          courses.map(course => {
            return (
              <CourseCard
                key={course._id}
                title={course.title}
                imageSrc={course.poster.url}
                views={course.views}
                creator={course.createdBy}
                desc={course.description}
                lectureCount={course.numberOfVideo}
                addToPlaylistHandler={addToPlaylistHandler}
                id={course._id}
              />
            );
          })
        ) : (
          <Heading children="Courses Not Found" opacity={0.4} mt={'4'} />
        )}
      </Stack>
    </Container>
  );
};

export default Courses;
