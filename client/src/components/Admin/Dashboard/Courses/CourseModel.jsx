import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import {
  Box,
  Grid,
  Heading,
  Input,
  Button,
  Text,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
const CourseModel = ({
  isOpen,
  onClose,
  id,
  deleteButtonHandler,
  courseTitle,
  lectures = [],
  addLectureButtonHandler,
  loading,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoPrev, setVideoPrev] = useState('');
  const [video, setVideo] = useState('');

  console.log(video);

  const changeVideoHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };
  const closeHandler = () => {
    setTitle('');
    setDescription('');
    setVideoPrev('');
    onClose();
  };
  return (
    <>
      <Modal
        size={'full'}
        isOpen={isOpen}
        onClose={closeHandler}
        scrollBehavior="outside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{courseTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={'16'}>
            <Grid templateColumns={['1fr', '3fr 1fr']}>
              <Box px={['0', '16']}>
                <Box my={5}>
                  <Heading>{courseTitle}</Heading>
                  <Heading opacity={0.4} size={'sm'}>{`#${id}`}</Heading>
                </Box>
                <Heading size={'lg'}>Lectures</Heading>
                {lectures &&
                  lectures.map((item, i) => (
                    <VideoCard
                      key={i}
                      title={item.title}
                      description={item.description}
                      num={i + 1}
                      lectureId={item._id}
                      courseId={id}
                      deleteButtonHandler={deleteButtonHandler}
                      loading={loading}
                    />
                  ))}
              </Box>
              <Box>
                <form
                  onSubmit={e =>
                    addLectureButtonHandler(e, id, title, description, video)
                  }
                >
                  <VStack spacing={'4'}>
                    <Heading size={'md'} textTransform={'uppercase'}>
                      Add Lecture
                    </Heading>
                    <Input
                      focusBorderColor="purple.300"
                      placeholder="Title"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                    <Input
                      focusBorderColor="purple.300"
                      placeholder="Description"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    />

                    <Input
                      type="file"
                      accept="video/*"
                      placeholder="Video"
                      onChange={changeVideoHandler}
                      focusBorderColor="purple.500"
                      css={{
                        '&::file-selector-button': {
                          cursor: 'pointer',
                          marginLeft: '-5%',
                          width: '110%',
                          height: '100%',
                          color: 'purple',
                          border: 'none',
                          background: 'white',
                        },
                      }}
                    />

                    {videoPrev && (
                      <video
                        src={videoPrev}
                        boxSize={'64'}
                        objectFit={'contain'}
                        controlsList="nodownload"
                        controls
                      ></video>
                    )}

                    <Button
                      isLoading={loading}
                      w={'full'}
                      color={'white'}
                      colorScheme="purple"
                      type="submit"
                    >
                      Upload
                    </Button>
                  </VStack>
                </form>
              </Box>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button
              variant={'ghost'}
              colorScheme="purple"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CourseModel;

function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteButtonHandler,
  loading,
}) {
  return (
    <Stack
      direction={['column', 'row']}
      my={8}
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
      justifyContent={['flex-start', 'space-between']}
      p={['4', '8']}
    >
      <Box>
        <Heading size={'sm'} children={`#${num} ${title}`} />

        <Text children={description}></Text>
      </Box>
      <Button
        isLoading={loading}
        color={'purple.600'}
        onClick={() => deleteButtonHandler(courseId, lectureId)}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}
