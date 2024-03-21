// store.js
import { configureStore } from '@reduxjs/toolkit';
import CRUDOperation from './crudOperationSlice'; // Adjust the path

const store = configureStore({
  reducer: {
    user: CRUDOperation
    // Add other reducers if you have them
  },
});

export default store;
