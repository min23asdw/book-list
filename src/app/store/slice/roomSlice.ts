import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Room {
  id: number;
  name: string;
  name_en: string;
  slug: string;
  description: string;
  link_url: string;
  room_icon_url: string;
  is_pinned: boolean;
  pinned_time: string | null;
  order: number | null;
}

interface RoomState {
  rooms: Room[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RoomState = {
  rooms: [],
  status: 'idle',
  error: null,
};

const authHeader = process.env.NEXT_PUBLIC_DB_KEY || '';
export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  const response = await fetch('https://pantip.com/api/forum-service/home/get_room_recommend', {
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

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rooms = action.payload;  
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch rooms';
      });
  },
});

export default roomSlice.reducer;
