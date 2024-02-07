import React, { useState } from 'react';
import {
  Stack,
  HStack,
  VStack,
  Heading,
  Text,
  Button,
  Image,
 
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const CourseCard = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  desc,
  lectureCount,
}) => {

  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image src={imageSrc} boxSize={'60'} objectFit={'contain'} />
      <Heading
        textAlign={['center', 'left']}
        maxW={'200px'}
        fontFamily={'sans-serif'}
        noOfLines={3}
        children={title}
        size={'sm'}
      />
      <Text noOfLines={3} children={desc} />
      <HStack>
        <Text
          fontWeight={'bold'}
          textTransform={'uppercase'}
          children={'Creator'}
        />
        <Text noOfLines={3} children={creator} />
      </HStack>
      <Heading
        textAlign={'center'}
        size={'xs'}
        children={`Lectures - ${lectureCount}`}
      />
      <Heading size={'xs'} children={`Views - ${views}`} />

      <Stack direction={['column', 'row']} alignItems={'center'}>
        <Link to={`/course/${id}`}>
          {' '}
          <Button colorScheme="yellow">Watch Now</Button>
        </Link>
        <Button variant={"ghost"} colorScheme="yellow" onClick={()=>addToPlaylistHandler(id)} >Add to Playlist</Button>
      </Stack>
    </VStack>
  );
};

export default CourseCard;
