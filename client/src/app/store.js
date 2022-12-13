import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import auth from '../services/auth';

const user = auth.getCurrentUser();
const token = auth.getAuthToken();

const preloadedState = {
  auth: {
    userLogin: {
      isLoggedIn: !!(user && token),
      user,
      token,
    },
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState,
});

export default store;
