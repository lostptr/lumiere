import { StyleSheet, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface BottomSheetOptionProps {
  name: string,
  icon: string,
  onPress?: () => void
}

export default function BottomSheetOption({ name, icon, onPress = () => { } }: BottomSheetOptionProps) {
  return <TouchableRipple style={styles.touchable} onPress={onPress}>
    <View style={styles.container}>
      <Icon name={icon} size={48}></Icon>
      <Text variant="titleMedium">{name}</Text>
    </View>
  </TouchableRipple>
}


const styles = StyleSheet.create({
  touchable: {
    flexGrow: 1,
    padding: 32,
    borderRadius: 8,
    // backgroundColor: 'gray',
  },

  container: {
    alignItems: 'center',
    rowGap: 8,
  },
});