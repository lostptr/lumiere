import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { create, edit } from "@store/reducers/note";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Appbar, Button, Chip, IconButton, Text, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { MainRoutesParamsList } from "src/routes";
import { Note } from "src/types";
import AddTagButton from "./components/AddTagButton";
import { BottomSheet } from "@components";
import BottomSheetOption from "./components/BottomSheetOption";
import { pickFromGallery, takePicture } from "@services/image";

type EditorProps = NativeStackScreenProps<MainRoutesParamsList, 'Editor'>

type ImageSource = "gallery" | "camera";

export default function Editor({ route, navigation }: EditorProps) {
  const dispatch = useDispatch();
  const operation = route.params.operation;

  const [title, setTitle] = useState(route.params.note.title);
  const [content, setContent] = useState(route.params.note.content);
  const [tags, setTags] = useState(route.params.note.tags ?? []);
  const [cover, setCover] = useState<string | undefined>(route.params.note.cover);
  const [coverSourcePickerVisible, setCoverSourcePickerVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Appbar.Action icon="check" onPress={onSubmit} />
      }
    });
  }, [navigation, title, content, tags, cover]);

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

  const openImagePicker = async (source: ImageSource) => {
    setCoverSourcePickerVisible(false);
    const action = (source === "camera") ? takePicture : pickFromGallery;
    const picture = await action();

    if (picture.success) {
      setCover(picture.imageUri);
    }
    else {
      if (picture.error) {
        console.error(picture.error);
      }
    }

  }

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
      <View>
        <Image source={{ uri: cover }} style={styles.cover} />
        <IconButton
          icon="image-edit"
          iconColor="#FFF"
          onPress={() => setCoverSourcePickerVisible(true)}
          style={{ position: 'absolute', right: 0, bottom: 0, marginHorizontal: 16, }}></IconButton>
      </View>
    }

    <View style={{ flexDirection: "row", alignItems: 'center' }}>
      <TextInput
        style={[styles.title, styles.invisibleTextInput]}
        value={title}
        underlineColor="transparent"
        onChangeText={setTitle}
        placeholder="Write a title here..."
      />

      {!cover &&
        <Button
          style={{ marginTop: 8, marginHorizontal: 4 }}
          compact={true}
          onPress={() => setCoverSourcePickerVisible(true)}
          icon="image-plus"
        >
          Add Cover
        </Button>
      }
    </View>

    <TextInput
      style={[styles.content, styles.invisibleTextInput]}
      value={content}
      underlineColor="transparent"
      onChangeText={setContent}
      placeholder="Write the contents of the note here..."
      multiline={true}
    />

    <View style={styles.tagContainer}>
      {tagElements}

      <AddTagButton onTagAdded={(tag) => addTag(tag)} />
    </View>

    <BottomSheet visible={coverSourcePickerVisible} onDismiss={() => setCoverSourcePickerVisible(false)}>
      <Text variant="titleMedium" style={{ margin: 8 }} >Select an image from:</Text>
      <View style={styles.bottomSheetOptions}>
        <BottomSheetOption name="Gallery" icon="image-multiple" onPress={() => openImagePicker("gallery")} />
        <BottomSheetOption name="Camera" icon="camera" onPress={() => openImagePicker("camera")} />
      </View>
    </BottomSheet>
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
    marginVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    columnGap: 8,
    rowGap: 8,
    flexWrap: "wrap"
  },

  title: {
    flex: 2,
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

  bottomSheetOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    columnGap: 16,
    paddingHorizontal: 16,
  },
});