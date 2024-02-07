import { configureStore } from '@reduxjs/toolkit';
import { profileReducer, subscriptionReducer, userReducer } from './reducers/userReducer';
import { coursesReducer } from './reducers/courseReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    courses: coursesReducer,
    subscription: subscriptionReducer,
  },
});

export const server = `https://course-loop-server.onrender.com/api/v1`;
