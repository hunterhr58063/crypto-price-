import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RecentDataEntry {
  _id: string;
  symbol: string;
  rate: number;
  datetime: string; // Assuming datetime is a string representation of date
}

interface RecentDataState extends Array<RecentDataEntry> {}

const initialState: RecentDataState = [];

const recentDataSlice = createSlice({
  name: 'recentData',
  initialState,
  reducers: {
    setRecentData: (state, action: PayloadAction<RecentDataState>) => {
      return action.payload;
    },
  },
});

export const { setRecentData } = recentDataSlice.actions;

export default recentDataSlice.reducer;
