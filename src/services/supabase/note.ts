import { Note } from "src/types";
import client from "./client";

const columnListString = 'id,title,content';

async function getAll(): Promise<Note[]> {
  const { data: notes, error } = await client
    .from('notes')
    .select(columnListString)
    .order("created_at");

  if (error) {
    return Promise.reject(error.message);
  }

  return Promise.resolve(notes);
}

export async function add(note: Note): Promise<Note> {
  const { data, error } = await client
    .from('notes')
    .insert(
      {
        title: note.title,
        content: note.content,
      },
    )
    .select(columnListString)
    .single();

  if (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(data);

}

export async function edit(note: Note): Promise<Note> {
  const { data, error } = await client
    .from('notes')
    .update({
      title: note.title,
      content: note.content,
      updated_at: new Date(),
    })
    .eq("id", note.id)
    .select(columnListString)
    .single();

  if (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(data);
}

export async function remove(id: string): Promise<void> {
  const { error } = await client
    .from('notes')
    .delete()
    .eq('id', id);

  if (error) {
    return Promise.reject(error);
  }
}

const noteService = {
  getAll,
  add,
  edit,
  remove,
};

export default noteService;