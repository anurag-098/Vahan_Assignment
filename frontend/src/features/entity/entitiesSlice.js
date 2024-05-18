
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: [],
  editingId: null,
  formData: {
    name: '',
    email: '',
    mobilenumber: '',
    dateofbirth: '',
  },
};

const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    setEntities: (state, action) => {
      state.entities = action.payload;
    },
    setEditingId: (state, action) => {
      state.editingId = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    addEntity: (state, action) => {
      state.entities.push(action.payload);
    },
    updateEntity: (state, action) => {
      const index = state.entities.findIndex(entity => entity.id === action.payload.id);
      state.entities[index] = action.payload;
      
    },
    deleteEntity: (state, action) => {
      state.entities = state.entities.filter(entity => entity.id !== action.payload);
    },
  },
});

export const {
  setEntities,
  setEditingId,
  setFormData,
  addEntity,
  updateEntity,
  deleteEntity,
} = entitiesSlice.actions;

export default entitiesSlice.reducer;
