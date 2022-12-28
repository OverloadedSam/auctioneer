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

const getWonAuctions = createAsyncThunk(
  'profile/wonAuctions',
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await http.get('/auctions/won');
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

const initialWonAuctionsState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const getWonAuctionsSlice = createSlice({
  name: 'profile/wonAuctions',
  initialState: initialWonAuctionsState,
  extraReducers: (builder) => {
    builder.addCase(getWonAuctions.pending, (wonAuctions, action) => {
      wonAuctions.loading = true;
      wonAuctions.error = null;
    });
    builder.addCase(getWonAuctions.fulfilled, (wonAuctions, action) => {
      wonAuctions.loading = false;
      wonAuctions.success = true;
      wonAuctions.data = action.payload.data;
    });
    builder.addCase(getWonAuctions.rejected, (wonAuctions, action) => {
      wonAuctions.loading = false;
      wonAuctions.success = false;
      wonAuctions.error = action.payload;
    });
  },
});

export default combineReducers({
  myAuctions: getMyAuctionsSlice.reducer,
  wonAuctions: getWonAuctionsSlice.reducer,
});

export { getMyAuctions, getWonAuctions };
