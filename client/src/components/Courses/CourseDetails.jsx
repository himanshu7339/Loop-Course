import { VStack, Heading, Text, Box, Grid } from '@chakra-ui/react';
import { Link, useParams, Navigate } from 'react-router-dom';
import introVideo from '../../assets/videos/codingVideo.mp4';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCourseLectures } from '../../redux/actions/courseAction';
import { useSelector } from 'react-redux';
import Loader from '../Layout/Loader';
const CourseDetails = ({ user }) => {
  const { id } = useParams();
  const [lectureNumber, setLectureNumber] = useState(0);
  const { lectures, loading } = useSelector(state => state.courses);
  /*
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
  */

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourseLectures(id));
  }, [id, dispatch]);

  // condition if only admin access without subscription and user can access when he have a subscription
  if (
    (user.subscription.status !== 'active' ||
      user.subscription === undefined) &&
    user.role !== 'admin'
  ) {
    return <Navigate to={'/subscribe'} />;
  }

  if (loading) {
    return <Loader />;
  }
  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      {lectures && lectures.length > 0 ? (
        <>
          <Box>
            <video
              width={'100%'}
              disablePictureInPicture
              disableRemotePlayback
              autoPlay="true"
              controls
              controlsList="nodownload  noremoteplayback"
              src={lectures[lectureNumber].video.url}
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
              <button
                key={item.id}
                onClick={() => {
                  setLectureNumber(index);
                }}
                style={{
                  width: '100%',
                  padding: '1rem',
                  margin: '0',
                  borderBottom: '1px solid rgba(0, 0, 0,0.2 )',
                }}
              >
                <Text>
                  #{index + 1} {item.title}
                </Text>
              </button>
            ))}
          </VStack>
        </>
      ) : (
        <Heading children="No Lectures Found" />
      )}
    </Grid>
  );
};

export default CourseDetails;
