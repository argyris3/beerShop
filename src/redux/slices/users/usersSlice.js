import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../utils/baseURL.js';
import { resetErrAction } from '../globalActions/globalActions.js';

//initial state
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: null,
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
  },
};

//register action
export const registerUserAction = createAsyncThunk(
  'users/register',
  async ({ email, password, fullname }, { rejectWithValue, getState, dispatch }) => {
    try {
      //make the http request
      const { data } = await axios.post(`${baseURL}/users/register`, {
        email,
        password,
        fullname,
      });

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//login action
export const loginUserAction = createAsyncThunk(
  'users/login',
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      //make the http request
      const { data } = await axios.post(`${baseURL}/users/login`, {
        email,
        password,
      });
      //save the user into localstorage
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);
//update user shipping address
export const updateUserShippingAction = createAsyncThunk(
  'users/update-shipping-address',
  async (
    { firstName, lastName, address, city, postalCode, province, phone, country },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      //get token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //make the http request
      const { data } = await axios.put(
        `${baseURL}/users/update/shipping`,
        {
          firstName,
          lastName,
          address,
          city,
          postalCode,
          province,
          phone,
          country,
        },
        config
      );

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);
//user profile action
export const getUserProfileAction = createAsyncThunk(
  'users/profile-fetched',
  async (
    payload,

    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      //get token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //make the http request
      const { data } = await axios.get(
        `${baseURL}/users/profile`,

        config
      );

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);
//logout
export const logoutAction = createAsyncThunk(
  'users/logout',
  async (
    payload,

    { rejectWithValue, getState, dispatch }
  ) => {
    //remove
    localStorage.removeItem('userInfo');

    return true;
  }
);

//user slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    //handle actions
    //login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.userAuth.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.userAuth.loading = false;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.userAuth.loading = false;
    });
    //register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //user profile
    builder.addCase(getUserProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserProfileAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserProfileAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //update address
    builder.addCase(updateUserShippingAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUserShippingAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });

    builder.addCase(updateUserShippingAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //logout
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = null;
    });
    //reset error action
    builder.addCase(resetErrAction.pending, (state) => {
      state.error = null;
    });
  },
});

//generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;
