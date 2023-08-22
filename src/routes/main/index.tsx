import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Editor, Home, Profile } from "@screens";
import { Appbar } from "react-native-paper";
import { Note } from "src/types";
import UserAvatar from "./components/UserAvatar";

export type MainRoutesParamsList = {
  Home: undefined,
  Editor: { note: Note, operation: "create" | "edit" },
  Profile: undefined,
}

const Stack = createNativeStackNavigator<MainRoutesParamsList>();
export default function MainRoutes() {
  return <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        title: 'Minhas Notas',
        headerLeft: UserAvatar,
        headerRight: () => (<Appbar.Action icon="magnify" onPress={() => { }} />)
      }}
    />

    <Stack.Screen
      name="Editor"
      component={Editor}
      options={{
        headerBackButtonMenuEnabled: true,
        headerTitle: "New note",
        headerRight: () => (<Appbar.Action icon="check" />)
      }}
    />

    <Stack.Screen
      name="Profile"
      component={Profile}
    />
  </Stack.Navigator>
}