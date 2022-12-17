import {
  createSlice,
  createAsyncThunk,
  combineReducers,
} from '@reduxjs/toolkit';
import http from '../services/http';

const initialCreateAuctionState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const createAuction = createAsyncThunk(
  'auction/create',
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await http.post('/auction', payload);
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

const createAuctionSlice = createSlice({
  name: 'auction/create',
  initialState: initialCreateAuctionState,
  extraReducers: (builder) => {
    builder.addCase(createAuction.pending, (auction, action) => {
      auction.loading = true;
      auction.error = null;
    });

    builder.addCase(createAuction.fulfilled, (auction, action) => {
      auction.loading = false;
      auction.success = true;
      auction.data = action.payload.data;
    });

    builder.addCase(createAuction.rejected, (auction, action) => {
      auction.loading = false;
      auction.success = false;
      auction.error = action.payload;
    });
  },
});

export default combineReducers({
  createAuction: createAuctionSlice.reducer,
});

export { createAuction };
