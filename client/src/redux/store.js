import { configureStore } from '@reduxjs/toolkit'
import { profileReducer, userReducer } from './reducers/userReducer'


export const store = configureStore({
  reducer: {
   user:userReducer,
   profile:profileReducer
  },
})


export const server = `https://loop-course-server.vercel.app/api/v1`