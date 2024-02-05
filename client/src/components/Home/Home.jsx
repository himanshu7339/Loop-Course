import React from 'react';
import {
  Stack,
  HStack,
  VStack,
  Heading,
  Text,
  Button,
  Image,
  Box,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import vg from '../../assets/images/vector-Image.jpg';
import './Home.css';
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { SiCoursera, SiUdemy } from 'react-icons/si';
import { DiAws } from 'react-icons/di';
import introVideo from '../../assets/videos/codingVideo.mp4';

const Home = () => {
  return (
    <section className="home">
      <div className="container">
        <Stack
          direction={['column', 'row']}
          height={'100%'}
          justifyContent={['center', 'space-between-']}
          alignItems={'center'}
          spacing={['16', '56']}
        >
          <VStack width={'full'} alignItems={['center', 'flex-end']}>
            <Heading children="Learn From The Experts" size={'2xl'} />
            <Text
              textAlign={['center', 'left']}
              children="Find Valuable Content At Reasonable Price"
            />
            <Link to={'/courses'}>
              <Button size={'lg'} colorScheme="yellow">
                Enroll Now
              </Button>
            </Link>
          </VStack>

          <Image
            className="vector-graphic"
            boxSize={'md'}
            src={vg}
            objectFit={'contain'}
          />
        </Stack>
      </div>

      <Box padding={'8'} bg={'blackAlpha.800'}>
        <Heading
          children="Our Brands"
          textAlign={'center'}
          fontFamily={'body'}
          color={'yellow.400'}
        />
        <HStack
          className="brand-banner"
          justifyContent={'space-evenly'}
          marginTop={'4'}
        >
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <SiUdemy />

          <DiAws />
        </HStack>
      </Box>

      <div className="container2">
        <video
          disablePictureInPicture
          disableRemotePlayback
          autoPlay="true"
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          src={introVideo}
        ></video>
      </div>
    </section>
  );
};

export default Home;
