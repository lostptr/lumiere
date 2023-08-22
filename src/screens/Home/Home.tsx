import { NoteCard } from "@components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { remove } from "@store/reducers/note";
import { RootState } from "@store/store";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, Dialog, FAB, Portal, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { MainRoutesParamsList } from "src/routes";
import { Note } from "src/types";

type HomeProps = NativeStackScreenProps<MainRoutesParamsList, 'Home'>

const createEmptyNote = (): Note => ({ id: '', title: '', content: '' });

export default function Home({ navigation }: HomeProps) {
  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.note.notes);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const createNote = () => {
    navigation.navigate('Editor', { operation: "create", note: createEmptyNote() });
  };

  const editNote = (note: Note) => {
    navigation.navigate('Editor', { operation: "edit", note });
  };

  const askForDelete = (note: Note) => {
    setSelectedNote(note);
  };

  const deleteActionConfirm = () => {
    if (selectedNote) {
      dispatch(remove({ id: selectedNote?.id }))
    }
    setSelectedNote(null);
  }

  return <View style={{ flex: 1, height: "100%" }}>
    <FlatList
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.container}
      data={notes}
      scrollEnabled={true}
      renderItem={({ item }) => <NoteCard note={item} onPress={editNote} onLongPress={askForDelete} />}
    />

    <Portal>
      <Dialog visible={!!selectedNote} onDismiss={() => setSelectedNote(null)}>
        <Dialog.Title>Are you sure?</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">Do you want to delete the note '{selectedNote?.title}'?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setSelectedNote(null)}>Cancel</Button>
          <Button theme={{ colors: { primary: 'red' } }} onPress={deleteActionConfirm}>Yes, delete</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>

    <FAB
      icon="plus"
      style={styles.fab}
      onPress={createNote}
    />
  </View>
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },

  fab: {
    position: 'absolute',
    margin: 24,
    right: 0,
    bottom: 0,
  }
});
