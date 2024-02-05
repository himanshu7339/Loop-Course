import React from 'react';
import {
  VStack,
  Button,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import {
  RiAddCircleFill,
  RiDashboardFill,
  RiEyeFill,
  RiUser3Fill,
} from 'react-icons/ri';
const Sidebar = () => {
  const location = useLocation();
  return (
    <VStack
      spacing={'8'}
      p={'16'}
      boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
    >
      <Link to={'/admin/dashboard'}>
        <Button
          colorScheme={location.pathname === '/admin/dashboard' ? 'purple' : ''}
          fontSize={''}
          variant={'ghost'}
        >
          {' '}
          <RiDashboardFill style={{ margin: '4px' }} /> Dashboard
        </Button>
      </Link>
      <Link to={'/admin/create_course'}>
        <Button
          colorScheme={
            location.pathname === '/admin/create_course' ? 'purple' : ''
          }
          fontSize={''}
          variant={'ghost'}
        >
          {' '}
          <RiAddCircleFill style={{ margin: '4px' }} /> Create Course
        </Button>
      </Link>
      <Link to={'/admin/admin_courses'}>
        <Button
          colorScheme={location.pathname === '/admin/admin_courses' ? 'purple' : ''}
          fontSize={''}
          variant={'ghost'}
        >
          {' '}
          <RiEyeFill style={{ margin: '4px' }} /> Courses
        </Button>
      </Link>
      <Link to={'/admin/users'}>
        <Button
          colorScheme={location.pathname === '/admin/users' ? 'purple' : ''}
          fontSize={''}
          variant={'ghost'}
        >
          {' '}
          <RiUser3Fill style={{ margin: '4px' }} /> Users
        </Button>
      </Link>
    </VStack>
  );
};

export default Sidebar;
