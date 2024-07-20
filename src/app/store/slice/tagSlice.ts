import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Tag {
  name: string;
  slug: string;
  pageview: number;
  topic_count: number;
  follow_count: number;
}

interface TagState {
  tags: Tag[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TagState = {
  tags: [],
  status: 'idle',
  error: null,
};

const authHeader = process.env.NEXT_PUBLIC_DB_KEY || '';

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  const response = await fetch('https://pantip.com/api/forum-service/home/get_tag_hit?limit=10', {
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

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch tags';
      });
  },
});

export default tagSlice.reducer;
