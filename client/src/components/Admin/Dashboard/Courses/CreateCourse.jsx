import React, { useState } from 'react';

import { Box, Grid, Container, Heading,VStack,Input,Select ,Image,Button} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Sidebar from '../../Sidebar';
const CreateCourse = () => {
  const  [title,setTitle]=useState("")
  const  [description,setDescription]=useState("")
  const  [createdBy,setCreatedBy]=useState("")
  const  [category,setCategory]=useState("")
  const  [image,setImage]=useState("")
  const  [imagePrev,setImagePrev]=useState("")

  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home Decor',
    'Sports',
    'Beauty',
  ];

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };
  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
      <Container py={16}>
        <form>
          <Heading
            textTransform={'uppercase'}
            my={16}
            textAlign={['center', 'left']}
          >
            Create Course
          </Heading>

          <VStack m={"auto"} spacing={"8"}>
          <Input
          value={title}
          type="text"
          placeholder="Title"
          onChange={e => setTitle(e.target.value)}
          focusBorderColor="purple.500"
        />
          <Input
          value={description}
          type="text"
          placeholder="Description"
          onChange={e => setDescription(e.target.value)}
          focusBorderColor="purple.500"
        />
          <Input
          value={createdBy}
          type="text"
          placeholder="Create Name"
          onChange={e => setCreatedBy(e.target.value)}
          focusBorderColor="purple.500"
        />
        <Select focusBorderColor='purple.300' value={category} onChange={e => setCategory(e.target.value)}>
<option selected>Categories</option>
{
  categories.map((items,index)=>(
    <option key={index} value={items}>{items}</option>
  ))
}
        </Select>
        <Input
              type="file"
              accept="image/*"
              placeholder="image"
              onChange={changeImageHandler}
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
            {
              imagePrev && (
                <Image src={imagePrev} boxSize={"64"} objectFit={"contain"} />
              )
            }

            <Button w={"full"} colorScheme={"purple"} type='submit'>Create</Button>
          </VStack>
        </form>
      </Container>

      <Sidebar />
    </Grid>
  );
};

export default CreateCourse;
