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
import vg from '../../assets/images/vector-Image.png';
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
          <VStack
            width={'full'}
            alignItems={['center', 'flex-start']}
            spacing={'2rem'}
          >
            <Heading
              children="Unleash Your Potential: Learn from the Experts in Every Field!"
              size={'2xl'}
              textDecoration={'underline'}
            />
            <Text
              fontSize={['medium', 'x-large']}
              textAlign={['center', 'left']}
              children="Invest in Your Mind Wisely: Valuable Content at a Budget-Friendly Price!"
              textDecoration={'underline'}
            />
            <Link to={'/courses'}>
              <Button
                size={'lg'}
                colorScheme="yellow"
                borderRadius="full"
                boxShadow="lg"
                _hover={{ bg: 'yellow.500' }}
                _active={{ bg: 'yellow.600' }}
              >
                Enroll Now
              </Button>
            </Link>
          </VStack>

          <Image
            className="vector-graphic"
            boxSize={'700px'}
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
