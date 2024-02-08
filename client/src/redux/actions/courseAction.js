import { server } from '../store';

import axios from 'axios';

export const getAllCourses =
  (category = '', keyword = '') =>
  async dispatch => {
    try {
      dispatch({ type: 'allCoursesRequest' });

      const {data} = await axios.get(`${server}/courses`, {
        params: {
          keyword,
          category,
        },
        withCredentials: true,
      });
      dispatch({ type: 'allCoursesSuccess', payload: data.courses });
    } catch (error) {
      dispatch({
        type: 'allCoursesFail',
        payload: error.response.data.message,
      });
    }
  };

  export const getAllCourseLectures =
  (courseId) =>
  async dispatch => {
    try {
      dispatch({ type: 'getCourseRequest' });

      const {data} = await axios.get(`${server}/courses/${courseId}`, {
        withCredentials: true,
      });
      dispatch({ type: 'getCourseSuccess', payload: data.lectures });
    } catch (error) {
      dispatch({
        type: 'getCourseFail',
        payload: error.response.data.message,
      });
    }
  };


 