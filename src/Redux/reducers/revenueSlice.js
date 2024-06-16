import { createSlice } from '@reduxjs/toolkit';
import { loadData, getCustomersByCategoryInQ2 } from '../../Controllers/service';

const revenueSlice = createSlice({
  name: 'revenue',
  initialState: {
    q2Data: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    fetchQ2DataStart: (state) => {
      state.status = 'loading';
    },
    fetchQ2DataSuccess: (state, action) => {
      state.status = 'succeeded';
      state.q2Data = action.payload;
    },
    fetchQ2DataFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { fetchQ2DataStart, fetchQ2DataSuccess, fetchQ2DataFailure } = revenueSlice.actions;

export const fetchQ2Data = () => async (dispatch) => {
  dispatch(fetchQ2DataStart());
  try {
    const data = await loadData();
    const q2Data = getCustomersByCategoryInQ2(data);
    dispatch(fetchQ2DataSuccess(q2Data));
  } catch (error) {
    dispatch(fetchQ2DataFailure(error.toString()));
  }
};

export const revenueReducer = revenueSlice.reducer;
