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

  const editNewNote = () => {
    navigation.navigate('Editor', { operation: "create", note: createEmptyNote() });
  };

  return <View style={{ flex: 1, height: "100%" }}>
    <FlatList
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.container}
      data={notes}
      scrollEnabled={true}
      renderItem={({ item }) => <NoteCard {...item} />}
    />
    <FAB
      icon="plus"
      style={styles.fab}
      onPress={editNewNote}
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
