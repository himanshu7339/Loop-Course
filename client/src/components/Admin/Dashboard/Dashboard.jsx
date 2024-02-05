import React from 'react';

import {
  Box,
  Grid,
  Text,
  Heading,
  Stack,
  HStack,
  Progress,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import { DoughnutChart, LineChart } from './Chart';

const DataBox = ({ title, qty, qtyPercentage, profit }) => {
  return (
    <Box
      w={['full', '20%']}
      boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
      p={'8'}
      borderRadius={'lg'}
    >
      <Text>{title}</Text>
      <HStack spacing={'6'}>
        <Text fontSize={'2xl'} fontWeight={'bold'}>
          {qty}
        </Text>
        <HStack>
          <Text>{`${qtyPercentage}%`}</Text>
          {profit ? (
            <RiArrowUpLine color="green" />
          ) : (
            <RiArrowDownLine color="red" />
          )}
        </HStack>
      </HStack>
      <Text opacity={0.6}> Since Last Month</Text>
    </Box>
  );
};

// Bar component

const Bar = ({ title, value, profit }) => {
  return (
    <Box py={'4'} px={['0', '20']}>
      <Heading size={'sm'} children={title} mb={'2'} />
      <HStack w={'full'} alignItems={'center'}>
        <Text>{profit ? '0%' : `-${value}%`}</Text>
        <Progress w={'full'} value={profit ? value : 0} color={'purple'} />
        <Text> {value < 100 ? value : '100'}%</Text>
      </HStack>
    </Box>
  );
};
const Dashboard = () => {
  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
      <Box boxSizing="border-box" py={'16'} px={['4', '0']}>
        <Text
          textAlign={'center'}
          opacity={'0.5'}
          children={`Last change was on ${String(new Date()).split('G')[0]}`}
        />
        <Heading ml={['0', '16']} mb={'16'} textAlign={['center', 'left']}>
          {' '}
          Dashboard
        </Heading>
        <Stack
          direction={['column', 'row']}
          minH={'24'}
          justifyContent={'space-evenly'}
        >
          <DataBox title="View" qty={123} qtyPercentage={30} profit={true} />
          <DataBox title="Users" qty={45} qtyPercentage={97} profit={true} />
          <DataBox
            title="Subscription"
            qty={89}
            qtyPercentage={53}
            profit={false}
          />
        </Stack>

        <Box
          m={['0', '16']}
          borderRadius={'lg'}
          p={['0', '16']}
          mt={['4', '16']}
          boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
        >
          <Heading
            textAlign={['center', 'left']}
            size={'md'}
            children="View Graph"
            pt={['8', '0']}
            ml={['0', '16']}
          />
          {/* Line Graph Here */}
          <LineChart/>
        </Box>
        <Grid templateColumns={['1fr', '2fr 2fr']}>
          <Box p={'4'}>
            <Heading
              textAlign={['center', 'left']}
              size={'md'}
              children="Progress Bar"
              my={'8'}
              ml={['0', '16']}
            />

            <Box>
              <Bar profit={true} title="View" value="30" />
              <Bar profit={true} title="Users" value="97" />
              <Bar profit={false} title="Subscription" value="53" />
            </Box>
          </Box>
          <Box p={['0', '16']} boxSizing={'border-box'} py={'4'}>
            <Heading
              textAlign={'center'}
              size={'md'}
              mb={'4'}
              children="Users"
            />

            <DoughnutChart/>
          </Box>
        </Grid>
      </Box>
      <Sidebar />
    </Grid>
  );
};

export default Dashboard;
