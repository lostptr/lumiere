import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { noteService } from "@services/supabase";
import { Note, ResourceStatus } from "src/types";

interface NoteStore {
  notes: Note[]
  state: ResourceStatus,
  synced: boolean,
  error?: string,
}

const initialState: NoteStore = {
  notes: [],
  state: "idle",
  synced: false,
}

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => await noteService.getAll());

export const create = createAsyncThunk(
  'notes/create',
  async (note: Note) => {
    return await noteService.add(note);
  }
);

export const edit = createAsyncThunk(
  'notes/edit',
  async (note: Note) => {
    return await noteService.edit(note);
  }
);

export const remove = createAsyncThunk(
  'notes/delete',
  async (note: Note) => {
    await noteService.remove(note.id);
    return note;
  }
);

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.state = 'loading';
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.state = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.state = 'succeded';
        state.synced = true;
        state.notes = [...action.payload];
      })


      .addCase(create.pending, (state) => {
        state.state = 'loading';
      })
      .addCase(create.rejected, (state, action) => {
        state.state = 'failed';
        state.error = action.error.message;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.state = 'succeded';
        state.synced = false;
      })


      .addCase(edit.pending, (state) => {
        state.state = 'loading';
      })
      .addCase(edit.rejected, (state, action) => {
        state.state = 'failed';
        state.error = action.error.message;
      })
      .addCase(edit.fulfilled, (state, action) => {
        state.state = 'succeded';
        state.synced = false;
      })


      .addCase(remove.pending, (state) => {
        state.state = 'loading';
      })
      .addCase(remove.rejected, (state, action) => {
        state.state = 'failed';
        state.error = action.error.message;
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.state = 'succeded';
        state.notes = state.notes.filter((v) => v.id !== action.payload.id);
      })
  }
});

export const { } = noteSlice.actions;
export default noteSlice.reducer;