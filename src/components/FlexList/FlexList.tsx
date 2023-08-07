import { Key } from "react";
import { StyleProp, StyleSheet, View, ViewStyle, VirtualizedList } from "react-native";

export interface FlexListProps<T> {
  data: T[],
  style: StyleProp<ViewStyle>,
  renderChild: (item: T) => React.ReactNode,
  keyExtractor: (item: T) => Key,
}

export default function FlexList<T>({ data, style }: FlexListProps<T>) {
  return <View style={style}>

  </View>
}

const styles = StyleSheet.create({

});