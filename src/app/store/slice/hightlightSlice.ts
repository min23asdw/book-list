import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Highlight {
  name: string;
  message: string;
  weight: number;
  image_url: string[];
  post_url: string;
}

interface HighlightState {
  highlights: Highlight[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: HighlightState = {
  highlights: [],
  status: 'idle',
  error: null,
};

const authHeader = process.env.NEXT_PUBLIC_DB_KEY || '';

export const fetchHighlights = createAsyncThunk('highlights/fetchHighlights', async () => {
  const response = await fetch('https://pantip.com/api/forum-service/home/get_highlight', {
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

const highlightSlice = createSlice({
  name: 'highlights',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHighlights.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHighlights.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.highlights = action.payload;
      })
      .addCase(fetchHighlights.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch highlights';
      });
  },
});

export default highlightSlice.reducer;