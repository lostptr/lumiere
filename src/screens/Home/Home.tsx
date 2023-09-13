import { NoteCard } from "@components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { fetchNotes, remove } from "@store/reducers/note";
import { RootState, useAppDispatch } from "@store/store";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Dialog, FAB, Portal, Text, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import { MainRoutesParamsList } from "src/routes";
import { Note } from "src/types";

type HomeProps = NativeStackScreenProps<MainRoutesParamsList, 'Home'>

const createEmptyNote = (): Note => ({ id: '', title: '', content: '' });

export default function Home({ navigation }: HomeProps) {

  const dispatch = useAppDispatch();
  const noteStore = useSelector((state: RootState) => state.note);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const theme = useTheme();

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
      dispatch(remove(selectedNote))
    }
    setSelectedNote(null);
  }

  useEffect(() => {
    if (noteStore.state === "idle" || !noteStore.synced) {
      dispatch(fetchNotes());
    }
  }, [noteStore.state, noteStore.synced]);

  return <>
    <SafeAreaView style={{ flexGrow: 1, height: "100%" }}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.container}
        data={noteStore.notes}
        scrollEnabled={true}
        refreshControl={
          <RefreshControl
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
            refreshing={noteStore.state === 'loading'}
            onRefresh={() => dispatch(fetchNotes())} />
        }
        ListFooterComponent={() => <View style={{ height: 80 }} />}
        renderItem={({ item }) => <NoteCard note={item} onPress={editNote} onLongPress={askForDelete} />}
      />
    </SafeAreaView>

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
  </>
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 8,
  },

  fab: {
    position: 'absolute',
    margin: 24,
    right: 0,
    bottom: 0,
  }
});

