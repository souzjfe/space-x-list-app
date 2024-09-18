import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Launch {
  id: string;
  name: string;
  date_utc: string;
  details: string;
  links: {
    youtube_id: string | null;
    article: string | null;
  };
}

interface LaunchState {
  launches: Launch[];
  loading: boolean;
}

const initialState: LaunchState = {
  launches: [],
  loading: false,
};

export const fetchLaunches = createAsyncThunk('launches/fetchLaunches', async () => {
  const response = await axios.get('https://api.spacexdata.com/v4/launches');
  return response.data;
});

const launchesSlice = createSlice({
  name: 'launches',
  initialState,
  reducers: {
    searchByRocketName: (state, action) => {
      state.launches = state.launches.filter((launch) =>
        launch.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaunches.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLaunches.fulfilled, (state, action) => {
        state.launches = action.payload;
        state.loading = false;
      });
  },
});

export default launchesSlice.reducer;
