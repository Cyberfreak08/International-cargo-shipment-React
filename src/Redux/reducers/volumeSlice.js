import { createSlice } from '@reduxjs/toolkit';
import { loadData, getNationalVsInternational } from '../../Controllers/service'; // Adjust the import path as necessary

const volumeSlice = createSlice({
  name: 'volume',
  initialState: {
    national: 0,
    international: 0,
    nationalData: [],
    internationalData: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    fetchVolumeData: (state) => {
      state.status = 'loading';
    },
    fetchVolumeDataSuccess: (state, action) => {
      state.status = 'succeeded';
      state.national = action.payload.national;
      state.international = action.payload.international;
      state.nationalData = action.payload.nationalData.map(d => ({ ...d, x: new Date(d.x) }));
      state.internationalData = action.payload.internationalData.map(d => ({ ...d, x: new Date(d.x) }));
    },
    fetchVolumeDataFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  fetchVolumeData,
  fetchVolumeDataSuccess,
  fetchVolumeDataFailure,
} = volumeSlice.actions;

export const fetchData = () => async (dispatch) => {
  dispatch(fetchVolumeData());
  try {
    const data = await loadData();
    const volumeData = getNationalVsInternational(data);

    dispatch(fetchVolumeDataSuccess(volumeData));
  } catch (error) {
    dispatch(fetchVolumeDataFailure(error.toString()));
  }
};

export const volumeReducer = volumeSlice.reducer;
