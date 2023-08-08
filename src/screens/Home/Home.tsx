import { NoteCard } from "@components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootState } from "@store/store";
import { FlatList, StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";
import { useSelector } from "react-redux";
import { RoutesParamsList } from "src/routes";
import { Note } from "src/types";

type HomeProps = NativeStackScreenProps<RoutesParamsList, 'Home'>

const createEmptyNote = (): Note => ({ id: 0, title: '', content: '' });

export default function Home({ navigation }: HomeProps) {
  const notes = useSelector((state: RootState) => state.note.notes);

  const createNote = () => {
    navigation.navigate('Editor', { operation: "create", note: createEmptyNote() });
  };

  const editNote = (note: Note) => {
    navigation.navigate('Editor', { operation: "edit", note });
  };

  return <View style={{ flex: 1, height: "100%" }}>
    <FlatList
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.container}
      data={notes}
      scrollEnabled={true}
      renderItem={({ item }) => <NoteCard note={item} onPress={editNote} />}
    />
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
