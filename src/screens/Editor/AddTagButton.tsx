import { useRef, useState } from "react";
import { TextInput as RNTextInput, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";


interface AddTagButtonProps {
  onTagAdded: (tag: string) => void,
}

export default function AddTagButton({ onTagAdded }: AddTagButtonProps) {
  const [isTyping, setTyping] = useState(false);
  const [newTag, setNewTag] = useState("");

  const reset = () => {
    setTyping(false);
    setNewTag("");
  }

  const onSubmit = () => {
    onTagAdded(newTag);
    reset();
  }

  return <>
    {!isTyping &&
      <Button onPress={() => setTyping(true)} icon="tag-plus">
        Add tag...
      </Button>
    }

    {isTyping &&
      <TextInput
        value={newTag}
        dense={true}
        autoFocus={true}
        mode="outlined"
        onBlur={reset}
        onSubmitEditing={onSubmit}
        onChangeText={setNewTag}
      />
    }
  </>;
}

const styles = StyleSheet.create({
})