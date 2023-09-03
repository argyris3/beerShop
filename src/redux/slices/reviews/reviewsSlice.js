import axios from 'axios';

import baseURL from '../../../utils/baseURL';
import { resetErrAction, resetSuccessAction } from '../globalActions/globalActions';

const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');

//initail state
const initialState = {
reviews: [],
  review: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

//create review action
export const createReviewAction = createAsyncThunk(
  'review/create',
  async ({rating,message,id}, { rejectWithValue, getState, dispatch }) => {
  
    try {
     
      //make request
      //token-auth
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          
        },
      };
      //request
      const { data } = await axios.post(`${baseURL}/reviews/${id}`, {
        rating,message
      },config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);


//slice
const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createReviewAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createReviewAction.fulfilled, (state, action) => {
      state.loading = false;
      state.review = action.payload;
      state.isAdded = true;
    });
    
    builder.addCase(createReviewAction.rejected, (state, action) => {
      state.loading = false;
      state.review = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    
   

    //reset error
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.error = null;
    });
    builder.addCase(resetSuccessAction.pending, (state, action) => {
        state.isAdded = false;
      });
  },
});

const reviewsReducer=reviewsSlice.reducer;

export default reviewsReducer