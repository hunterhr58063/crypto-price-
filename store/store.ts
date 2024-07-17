import { configureStore, combineReducers } from '@reduxjs/toolkit';
import recentDataReducer from './features/recentData/recentDataSlice';

// Define RootState type to include all reducers
export type RootState = ReturnType<typeof store.getState>;

// Combine reducers
const rootReducer = combineReducers({
  recentData: recentDataReducer,
});

// Configure the Redux store with combined reducers
export const store = configureStore({
  reducer: rootReducer,
});
