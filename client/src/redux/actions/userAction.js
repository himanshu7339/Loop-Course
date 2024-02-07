import { server } from '../store';

import axios from 'axios';

//login action
export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });
    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'loginFail', payload: error.response.data.message });
  }
};

//Register action
export const register = formData => async dispatch => {
  try {
    dispatch({ type: 'registerRequest' });
    const { data } = await axios.post(`${server}/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    dispatch({ type: 'registerSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'registerFail', payload: error.response.data.message });
  }
};

// Get My Profile
export const getMyProfile = () => async dispatch => {
  try {
    dispatch({ type: 'loadUserRequest' });
    const { data } = await axios.get(
      `${server}/me`,

      {
        withCredentials: true,
      }
    );

    dispatch({ type: 'loadUserSuccess', payload: data.user });
  } catch (error) {
    dispatch({ type: 'loadUserFail', payload: error.response.data.message });
  }
};

// logout user
export const logoutUser = () => async dispatch => {
  try {
    dispatch({ type: 'logoutRequest' });
    const { data } = await axios.get(
      `${server}/logout`,

      {
        withCredentials: true,
      }
    );

    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'logoutFail', payload: error.response.data.message });
  }
};



// add to playlist handler
export const addToPlaylist = id => async dispatch => {
  try {
    dispatch({ type: 'addToPlaylistRequest' });

    const { data } = await axios.post(
      `${server}/addtoplaylist`,
      {
        id,
      },
      {
       
        withCredentials: true,
      }
    );
    dispatch({ type: 'addToPlaylistSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'addToPlaylistFail',
      payload: error.response.data.message,
    });
  }
};


//login action
export const buySubscription = () => async dispatch => {
  try {
    dispatch({ type: 'buySubscriptionRequest' });
    const { data } = await axios.get(
      `${server}/subscribe`,
      {
        
        withCredentials: true,
      }
    );

    dispatch({ type: 'buySubscriptionSuccess', payload: data.subscriptionId });
  } catch (error) {
    dispatch({ type: 'buySubscriptionFail', payload: error.response.data.message });
  }
};