import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface SidebarContent {
  name: string;
  weight: number;
  image_url: string[];
  post_url: string;
}

interface SidebarState {
  content: SidebarContent[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SidebarState = {
  content: [],
  status: 'idle',
  error: null,
};

const authHeader = process.env.NEXT_PUBLIC_DB_KEY || '';

export const fetchSidebarContent = createAsyncThunk('sidebar/fetchSidebarContent', async () => {
  const response = await fetch('https://pantip.com/api/forum-service/home/get_sidebar_content', {
    headers: {
      'Authorization': authHeader,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const res = await response.json();
  return res.data;
});

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSidebarContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSidebarContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.content = action.payload;
      })
      .addCase(fetchSidebarContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch sidebar content';
      });
  },
});

export default sidebarSlice.reducer;
