import { configureStore } from '@reduxjs/toolkit';
import entitiesReducer from '../features/entity/entitiesSlice';

export const store = configureStore({
  reducer: {
    entities: entitiesReducer,
  },
});