import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLacunches } from '../services/http/spaceX';
import { LaunchData } from '../dtos/spaceX/launches';


interface LaunchState {
  launches: LaunchData[];
  pagination: { 
    totalPages: number;
  }
  loading: boolean;
}

const initialState: LaunchState = {
  launches: [],
  pagination: {
    totalPages: 0,
  },
  loading: false,
};

export const fetchLaunches = createAsyncThunk('launches/fetchLaunches', getLacunches);

const launchesSlice = createSlice({
  name: 'launches',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaunches.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLaunches.fulfilled, (state, action) => {
        state.launches = action.payload.launches;
        state.pagination = action.payload.pagination;
        state.loading = false;
      });
  },
});
export default launchesSlice.reducer;
