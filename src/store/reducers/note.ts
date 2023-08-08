
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Note } from "src/types";

interface NoteStore {
  notes: Note[]
}

const initialState: NoteStore = {
  notes: [],
}

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    create: (state, action: PayloadAction<Note>) => {
      const newNote = { ...action.payload };
      newNote.id = state.notes.length + 1;
      state.notes = [...state.notes, newNote];
    },
    edit: (state, action: PayloadAction<Note>) => {
      console.log(`Triggered 'edit' reducer.`);
    },
    delete: (state, action: PayloadAction<{ id: number }>) => {
      console.log(`Triggered 'delete' reducer.`);
    },
  }
});

export const { create } = noteSlice.actions;
export default noteSlice.reducer;