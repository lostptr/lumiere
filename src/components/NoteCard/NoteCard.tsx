import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { Note } from "src/types";
import Tag from "./Tag";

interface NoteCardProps {
  note: Note,
  onPress: (note: Note) => void,
}

export default function NoteCard({ onPress, note }: NoteCardProps) {

  const tagComponents = note.tags?.map((tag) => <Tag name={tag} key={tag} />)

  return <Card
    style={styles.card}
    mode="outlined"
    onPress={() => onPress(note)}
  >

    {!!note.cover &&
      <Card.Cover source={{ uri: note.cover }} />
    }

    <Card.Title title={note.title} titleVariant="titleLarge" />

    <Card.Content>
      <Text variant="bodyMedium">{note.content}</Text>

      {!!note.tags &&
        <View style={styles.tagContainer}>
          {tagComponents}
        </View>
      }
    </Card.Content>
  </Card>
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
  },

  tagContainer: {
    flexDirection: 'row',
    marginTop: 12,
    columnGap: 8,
  },
});
