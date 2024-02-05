import React, { useState } from 'react';
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
  const addToPlaylistHandler = () => {};
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
        <CourseCard
          title={'Introduction to Web Development'}
          imageSrc={
            'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }
          views={'1100'}
          creator={'Himanshu'}
          desc={
            'Learn the basics of web development with HTML, CSS, and JavaScript'
          }
          lectureCount={2}
          addToPlaylistHandler={addToPlaylistHandler}
          id={'9u402uo95h345'}
        />
        <CourseCard
          title={'Introduction to Web Development'}
          imageSrc={
            'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }
          views={'1100'}
          creator={'Himanshu'}
          desc={
            'Learn the basics of web development with HTML, CSS, and JavaScript'
          }
          lectureCount={2}
          addToPlaylistHandler={addToPlaylistHandler}
          id={'9u402uo95h345'}
        />
        <CourseCard
          title={'Introduction to Web Development'}
          imageSrc={
            'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }
          views={'1100'}
          creator={'Himanshu'}
          desc={
            'Learn the basics of web development with HTML, CSS, and JavaScript'
          }
          lectureCount={2}
          addToPlaylistHandler={addToPlaylistHandler}
          id={'9u402uo95h345'}
        />
      </Stack>
    </Container>
  );
};

export default Courses;
