import { configureStore } from '@reduxjs/toolkit'
import scheduleReducer from './scheduling';

export default configureStore({
  reducer: {
      scheduling: scheduleReducer,
  },
})