import { StyleSheet, View } from "react-native";
import { Card, Text, TouchableRipple } from "react-native-paper";
import { Note } from "src/types";
import Tag from "./Tag";

interface NoteCardProps {
  note: Note,
  onPress?: (note: Note) => void,
  onLongPress?: (note: Note) => void,
}

export default function NoteCard({ onPress = () => { }, note, onLongPress = () => { } }: NoteCardProps) {

  const tagComponents = note.tags?.map((tag) => <Tag name={tag} key={tag} />)

  return <TouchableRipple
    onPress={() => onPress(note)}
    onLongPress={() => onLongPress(note)}
    rippleColor="rgba(0, 0, 0, .32)"
    underlayColor="rgba(0, 0, 0, .32)"
    style={styles.container}
    borderless={true}
  >
    <Card
      mode="outlined">

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
  </TouchableRipple>
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },

  tagContainer: {
    flexDirection: 'row',
    marginTop: 12,
    columnGap: 8,
  },
});
