import {
  Stack,
  HStack,
  VStack,
  Heading,
  Text,
  Button,
  Image,
  Box,
  Grid,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import introVideo from '../../assets/videos/codingVideo.mp4';
import { useState } from 'react';
const CourseDetails = () => {
  const { id } = useParams();
  const [lectureNumber,setLectureNumber] = useState(0)
  

  const lectures = [
    {
      id: 1,
      title: 'Introduction to JavaScript',
      description: 'Learn the basics of JavaScript programming language.',
      videoObject: {
        url: 'https://example.com/js-intro-video',
        resolution: '1080p',
        duration: '15:30',
      },
    },
    {
      id: 2,
      title: 'Python Fundamentals',
      description: 'Explore the fundamentals of Python programming.',
      videoObject: {
        url: 'https://example.com/python-fundamentals',
        resolution: '720p',
        duration: '20:45',
      },
    },
    {
      id: 3,
      title: 'Web Development with HTML and CSS',
      description: 'Build responsive websites with HTML and CSS.',
      videoObject: {
        url: 'https://example.com/web-development',
        resolution: '1080p',
        duration: '25:15',
      },
    },
    // Add more entries as needed
  ];
  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      <Box>
        <video
          width={'100%'}
          disablePictureInPicture
          disableRemotePlayback
          autoPlay="true"
          controls
          controlsList="nodownload  noremoteplayback"
          src={introVideo}
        ></video>
        <Heading m={'4'}>
          {' '}
          {`#${lectureNumber + 1} ${lectures[lectureNumber].title}`}
        </Heading>
        <Heading m={'4'}> Description</Heading>
        <Text m={'4'}>${lectures[lectureNumber].description}</Text>
      </Box>
      <VStack>
        {lectures.map((item, index) => (
          <button key={item.id}
          onClick={() => {
            setLectureNumber(index);
          }}
           style={{
            width: '100%',
            padding: '1rem',
            margin:"0",
            borderBottom: '1px solid rgba(0, 0, 0,0.2 )'
          }}>
            <Text>
              #{index + 1} {item.title}
            </Text>
          </button>
        ))}
      </VStack>
    </Grid>
  );
};

export default CourseDetails;
