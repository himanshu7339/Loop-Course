import { server } from '../store';

import axios from 'axios';
// update profile action
export const updateProfile = (name, email) => async dispatch => {
  try {
    dispatch({ type: 'updateProfileRequest' });

    const { data } = await axios.put(
      `${server}/updateprofile`,
      {
        name,
        email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({ type: 'updateProfileSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateProfileFail',
      payload: error.response.data.message,
    });
  }
};
 // update profile picture
export const updateProfilePicture = formData => async dispatch => {
  try {
    dispatch({ type: 'updateProfilePictureRequest' });

    const { data } = await axios.put(
      `${server}/updateprofilepicture`,

      formData,

      {
        headers: {
            'Content-Type': 'multipart/from-data',
        },
        withCredentials: true,
      }
    );
console.log(data)
    dispatch({ type: 'updateProfilePictureSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateProfilePictureFail',
      payload: error.response.data.message,
    });
  }
};
// change profile password
export const changePassword = (oldPassword, newPassword) => async dispatch => {
  try {
    dispatch({ type: 'changePasswordRequest' });

    const { data } = await axios.put(
      `${server}/changepassword`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({ type: 'changePasswordSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'changePasswordFail',
      payload: error.response.data.message,
    });
  }
};


// forget password
export const forgetPassword = (email) => async dispatch => {
    try {
      dispatch({ type: 'forgetPasswordRequest' });
  
      const { data } = await axios.post(
        `${server}/forgetpassword`,
        {
         email
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
  
      dispatch({ type: 'forgetPasswordSuccess', payload: data.message });
    } catch (error) {
      dispatch({
        type: 'forgetPasswordFail',
        payload: error.response.data.message,
      });
    }
  };


  // reset password
export const resetPassword = (token,newPassword) => async dispatch => {
    try {
      dispatch({ type: 'resetPasswordRequest' });
  
      const { data } = await axios.post(
        `${server}/resetpassword/${token}`,
        {
        newPassword
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
  
      dispatch({ type: 'resetPasswordSuccess', payload: data.message });
    } catch (error) {
      dispatch({
        type: 'resetPasswordFail',
        payload: error.response.data.message,
      });
    }
  };