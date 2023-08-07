import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Editor, Home } from "@screens";
import { Appbar } from "react-native-paper";
import { Note } from "src/types";

export type RoutesParamsList = {
  Home: undefined,
  Editor: { note: Note, operation: "create" | "edit" }
}

const Stack = createNativeStackNavigator<RoutesParamsList>();

export default function Routes() {
  return <>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: (props) => {
            return <Appbar.Action icon="magnify" onPress={() => { }} />
          }
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
    </Stack.Navigator>
  </>
}