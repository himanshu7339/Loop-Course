import { createReducer } from '@reduxjs/toolkit';
const initialState = {};
export const userReducer = createReducer(initialState, builder => {
  builder
    .addCase('loginRequest', state => {
      state.loading = true;
    })
    .addCase('loginSuccess', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    })
    .addCase('loginFail', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    }).addCase('loadUserRequest', state => {
        state.loading = true;
      })
      .addCase('loadUserSuccess', (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload
      })
      .addCase('loadUserFail', (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
    .addCase('clearError', state => {
      state.error = null;
    })
    .addCase('clearMessage', state => {
      state.message = null;
    });
});
