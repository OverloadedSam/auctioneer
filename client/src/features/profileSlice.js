import {
  createSlice,
  createAsyncThunk,
  combineReducers,
} from '@reduxjs/toolkit';
import http from '../services/http';

const getMyProfile = createAsyncThunk(
  'profile',
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await http.get('/profile');
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

const initialProfileState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const getMyProfileSlice = createSlice({
  name: 'profile',
  initialState: initialProfileState,
  extraReducers: (builder) => {
    builder.addCase(getMyProfile.pending, (wonAuctions, action) => {
      wonAuctions.loading = true;
      wonAuctions.error = null;
    });
    builder.addCase(getMyProfile.fulfilled, (wonAuctions, action) => {
      wonAuctions.loading = false;
      wonAuctions.success = true;
      wonAuctions.data = action.payload.data;
    });
    builder.addCase(getMyProfile.rejected, (wonAuctions, action) => {
      wonAuctions.loading = false;
      wonAuctions.success = false;
      wonAuctions.error = action.payload;
    });
  },
});

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

const changeAvatar = createAsyncThunk(
  'profile/changeAvatar',
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await http.patch('/profile/changeAvatar', {
        avatar: payload.avatar,
      });
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

const initialChangeAvatarState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const changeAvatarSlice = createSlice({
  name: 'profile/changeAvatar',
  initialState: initialChangeAvatarState,
  reducers: {
    resetChangeAvatar() {
      return initialChangeAvatarState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changeAvatar.pending, (avatarChange, action) => {
      avatarChange.loading = true;
      avatarChange.error = null;
    });
    builder.addCase(changeAvatar.fulfilled, (avatarChange, action) => {
      avatarChange.loading = false;
      avatarChange.success = true;
      avatarChange.data = action.payload.data;
    });
    builder.addCase(changeAvatar.rejected, (avatarChange, action) => {
      avatarChange.loading = false;
      avatarChange.success = false;
      avatarChange.error = action.payload;
    });
  },
});

export default combineReducers({
  userProfile: getMyProfileSlice.reducer,
  myAuctions: getMyAuctionsSlice.reducer,
  wonAuctions: getWonAuctionsSlice.reducer,
  changeAvatar: changeAvatarSlice.reducer,
});

export { getMyProfile, getMyAuctions, getWonAuctions, changeAvatar };
export const { resetChangeAvatar } = changeAvatarSlice.actions;
