import { StyleSheet, View } from "react-native";
import { Card, Chip, Text } from "react-native-paper";
import Tag from "./Tag";

interface NoteCardProps {
  title: string,
  content: string,
  cover?: string,
  tags?: string[],
}

export default function NoteCard({ title, content, cover, tags }: NoteCardProps) {

  const tagComponents = tags?.map((tag) => <Tag name={tag} key={tag} />)

  return <Card style={styles.card}>

    {!!cover &&
      <Card.Cover source={{ uri: cover }} />
    }

    <Card.Title title={title} titleVariant="titleLarge" />

    <Card.Content>
      <Text variant="bodyMedium">{content}</Text>

      {!!tags &&
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
