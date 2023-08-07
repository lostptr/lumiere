import { FlatList, StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";
import { NoteCard } from "@components";
import { RoutesParamsList } from "src/routes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Note } from "src/types";

const mockNotes: Note[] = [
  {
    id: 1,
    title: "Primeira nota",
    content: "Cooisasa soiasdajdsf asdjf asdjfhsak jdc askdjfl asndc asdc",
    cover: "https://picsum.photos/700"
  },
  {
    id: 2,
    title: "Lista de compras",
    content: "Batata, feijão, arroz, abacaxi, macaxeira.",
    tags: ["listas"]
  },
  {
    id: 3,
    title: "Sonhos",
    content: "Ser um padeiro até 2025",
    tags: ["confeitaria", "sonhos"]
  },
  {
    id: 4,
    title: "Sonhos",
    content: "Ser um padeiro até 2025",
    tags: ["confeitaria", "sonhos"]
  },
]


type HomeProps = NativeStackScreenProps<RoutesParamsList, 'Home'>

const createEmptyNote = (): Note => ({ id: 0, title: '', content: '' });

export default function Home({ navigation }: HomeProps) {

  const editNewNote = () => {
    navigation.navigate('Editor', { operation: "create", note: createEmptyNote() });
  };

  return <View style={{ flex: 1, height: "100%" }}>
    <FlatList
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.container}
      data={mockNotes}
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
