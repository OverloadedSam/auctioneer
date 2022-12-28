import {
  createSlice,
  createAsyncThunk,
  combineReducers,
} from '@reduxjs/toolkit';
import http from '../services/http';

const getMyAuctions = createAsyncThunk(
  'profile/myAuctions',
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await http.get('/auctions/myAuctions');
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

const initialMyAuctionsState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const getMyAuctionsSlice = createSlice({
  name: 'profile/myAuctions',
  initialState: initialMyAuctionsState,
  extraReducers: (builder) => {
    builder.addCase(getMyAuctions.pending, (wonAuctions, action) => {
      wonAuctions.loading = true;
      wonAuctions.error = null;
    });
    builder.addCase(getMyAuctions.fulfilled, (wonAuctions, action) => {
      wonAuctions.loading = false;
      wonAuctions.success = true;
      wonAuctions.data = action.payload.data;
    });
    builder.addCase(getMyAuctions.rejected, (wonAuctions, action) => {
      wonAuctions.loading = false;
      wonAuctions.success = false;
      wonAuctions.error = action.payload;
    });
  },
});

export default combineReducers({
  myAuctions: getMyAuctionsSlice.reducer,
});

export { getMyAuctions };
