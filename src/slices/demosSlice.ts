import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Definindo o tipo para a Demo
interface Demo {
  id: number;
  name: string;
}

// Estado inicial
interface DemosState {
  demos: Demo[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: DemosState = {
  demos: [],
  status: 'idle',
};

// Thunks para operações assíncronas
export const fetchDemos = createAsyncThunk('demos/fetchDemos', async () => {
  const response = await axios.get('http://localhost:4000/demos');
  return response.data;
});

export const addDemo = createAsyncThunk('demos/addDemo', async (name: string) => {
  const response = await axios.post('http://localhost:4000/demos', { name });
  return response.data;
});

export const updateDemo = createAsyncThunk('demos/updateDemo', async (demo: Demo) => {
  await axios.put(`http://localhost:4000/demos/${demo.id}`, { name: demo.name });
  return demo;
});

export const deleteDemo = createAsyncThunk('demos/deleteDemo', async (id: number) => {
  await axios.delete(`http://localhost:4000/demos/${id}`);
  return id;
});

const demosSlice = createSlice({
  name: 'demos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDemos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDemos.fulfilled, (state, action) => {
        state.status = 'idle';
        state.demos = action.payload;
      })
      .addCase(fetchDemos.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addDemo.fulfilled, (state, action) => {
        state.demos.push(action.payload);
      })
      .addCase(updateDemo.fulfilled, (state, action) => {
        const index = state.demos.findIndex(demo => demo.id === action.payload.id);
        if (index !== -1) {
          state.demos[index] = action.payload;
        }
      })
      .addCase(deleteDemo.fulfilled, (state, action) => {
        state.demos = state.demos.filter(demo => demo.id !== action.payload);
      });
  },
});

export default demosSlice.reducer;
