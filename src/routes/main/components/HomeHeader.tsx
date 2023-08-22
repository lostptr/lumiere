import { RootState } from "@store/store";
import { View, StyleSheet } from "react-native";
import { MD3Theme, Text, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";


export default function HomeHeader() {
  const theme = useTheme();
  const user = useSelector((state: RootState) => state.user.user);

  const letter = user?.name[0].toUpperCase() ?? '?';

  const styles = getStyles(theme);

  return <View style={styles.container}>
    <View style={styles.avatar}>
      <Text style={styles.avatarLetter}>{letter}</Text>
    </View>

    <Text variant="titleMedium" style={styles.title}>Notas</Text>
  </View>;
}

const getStyles = (theme: MD3Theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 12,
    columnGap: 12,
    alignItems: 'center'
  },

  title: {
    fontSize: 18
  },

  avatar: {
    backgroundColor: theme.colors.primaryContainer,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarLetter: {
    fontSize: 20,
    fontWeight: '900',
    color: theme.colors.onPrimaryContainer
  },
});