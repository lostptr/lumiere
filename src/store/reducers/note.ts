import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Note } from "src/types";
import uuid from "react-native-uuid";

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
      newNote.id = uuid.v4().toString();
      state.notes = [...state.notes, newNote];
    },
    edit: (state, action: PayloadAction<Note>) => {
      const newNote = { ...action.payload };
      const notes = [...state.notes];
      const i = notes.findIndex(n => n.id === newNote.id);

      if (i === -1) {
        throw new Error(`Edit note: cannot find note with id '${newNote.id}'`);
      }

      // Replace the note in index 'i' with the new note.
      notes.splice(i, 1, newNote);

      state.notes = [...notes];
    },
    remove: (state, action: PayloadAction<{ id: string }>) => {
      state.notes = state.notes.filter(n => n.id !== action.payload.id);
    },
  }
});

export const { create, edit, remove } = noteSlice.actions;
export default noteSlice.reducer;