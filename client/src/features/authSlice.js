import {
  createSlice,
  createAsyncThunk,
  combineReducers,
} from '@reduxjs/toolkit';
import http from '../services/http';
import auth from '../services/auth';

const initialRegisterState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await http.post('/register', payload);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const registerSlice = createSlice({
  name: 'auth/registerUser',
  initialState: initialRegisterState,
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (register) => {
      register.loading = true;
      register.error = null;
    });

    builder.addCase(registerUser.fulfilled, (register, action) => {
      register.loading = false;
      register.success = true;
      register.data = action.payload.data;
      auth.saveUser(register.data);
      auth.saveAuthToken(register.data.token);
    });

    builder.addCase(registerUser.rejected, (register, action) => {
      register.loading = false;
      register.success = false;
      register.error = action.payload;
    });
  },
});

export default combineReducers({
  userRegister: registerSlice.reducer,
});

export { registerUser };
