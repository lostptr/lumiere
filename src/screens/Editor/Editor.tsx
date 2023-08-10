import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { create, edit } from "@store/reducers/note";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Appbar, Button, Chip, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { RoutesParamsList } from "src/routes";
import { Note } from "src/types";
import AddTagButton from "./AddTagButton";
import { launchImageLibrary } from "react-native-image-picker";


type EditorProps = NativeStackScreenProps<RoutesParamsList, 'Editor'>

export default function Editor({ route, navigation }: EditorProps) {
  const dispatch = useDispatch();
  const operation = route.params.operation;

  const [title, setTitle] = useState(route.params.note.title);
  const [content, setContent] = useState(route.params.note.content);
  const [tags, setTags] = useState(route.params.note.tags ?? []);
  const [cover, setCover] = useState<string | undefined>(route.params.note.cover);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Appbar.Action icon="check" onPress={onSubmit} />
      }
    });
  }, [navigation, title, content, tags]);

  const onSubmit = () => {
    const finalNote: Note = {
      id: route.params.note.id,
      title,
      content,
      tags,
      cover
    };

    let action;
    switch (operation) {
      case "create":
        action = create
        break;
      case "edit":
        action = edit;
        break;
    }

    dispatch(action(finalNote));

    navigation.navigate('Home');
  }

  const addTag = (tagToAdd: string) => {
    setTags([...tags, tagToAdd]);
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  }

  const addImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
      includeBase64: true,
    });

    if (!result.didCancel) {
      if (result.errorCode) {
        console.error(result.errorMessage);
        return;
      }

      const picture = result.assets?.at(0);
      if (picture) {
        const uri = `data:${picture.type};base64,${picture.base64}`;
        setCover(uri);
      }
    }
  };

  const tagElements = tags.map((tag) => (
    <Chip
      key={tag}
      mode="outlined"
      closeIcon="close"
      onClose={() => removeTag(tag)}>
      {tag}
    </Chip>
  ));

  return <View style={styles.container}>
    {!!cover &&
      <Image source={{ uri: cover }} style={styles.cover} />
    }

    {!cover &&
      <Button onPress={addImage} icon="image-plus">Add Image</Button>
    }

    <TextInput
      style={[styles.title, styles.invisibleTextInput]}
      value={title}
      underlineColor="transparent"
      onChangeText={setTitle}
      placeholder="Write a title here..."
    />

    <View style={styles.tagContainer}>
      {tagElements}

      <AddTagButton onTagAdded={(tag) => addTag(tag)} />
    </View>

    <TextInput
      style={[styles.content, styles.invisibleTextInput]}
      value={content}
      underlineColor="transparent"
      onChangeText={setContent}
      placeholder="Write the contents of the note here..."
      multiline={true}
    />
  </View>
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },

  cover: {
    height: 150,
  },

  tagContainer: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    columnGap: 8,
    rowGap: 8,
    flexWrap: "wrap"
  },

  title: {
    marginTop: 8,
    fontSize: 24,
    lineHeight: 42,
  },

  content: {
    flexGrow: 1,
  },

  invisibleTextInput: {
    backgroundColor: "transparent"
  },
});