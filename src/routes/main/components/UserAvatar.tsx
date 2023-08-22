import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootState } from "@store/store";
import { StyleSheet } from "react-native";
import { MD3Theme, Text, TouchableRipple, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import { MainRoutesParamsList } from "..";

export default function UserAvatar() {
  const theme = useTheme();
  const user = useSelector((state: RootState) => state.user.user);
  const navigation: NavigationProp<MainRoutesParamsList> = useNavigation();

  const styles = getStyles(theme);
  const letter = user?.name[0].toUpperCase() ?? '?';

  const goToProfile = () => {
    navigation.navigate('Profile');
  }

  return <TouchableRipple style={styles.avatar} onPress={goToProfile} borderless={true}>
    <Text style={styles.avatarLetter}>{letter}</Text>
  </TouchableRipple>
}

const getStyles = (theme: MD3Theme) => StyleSheet.create({
  avatar: {
    backgroundColor: theme.colors.primaryContainer,
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarLetter: {
    fontSize: 20,
    fontWeight: '900',
    color: theme.colors.onPrimaryContainer
  },
});