import { configureStore } from '@reduxjs/toolkit';
import { profileReducer, subscriptionReducer, userReducer } from './reducers/userReducer';
import { coursesReducer } from './reducers/courseReducer';
import { adminReducer } from './reducers/adminReducer';
import { otherReducer } from './reducers/otherReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    courses: coursesReducer,
    subscription: subscriptionReducer,
    admin:adminReducer,
    other : otherReducer
  },
});

// export const server = `https://course-loop-server.onrender.com/api/v1`;
 export const server = `http://localhost:7000/api/v1/`;
