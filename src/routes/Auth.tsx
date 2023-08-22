import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, SignUp } from "@screens";

export type AuthRoutesParamsList = {
  Login: undefined,
  SignUp: undefined,
}

const Stack = createNativeStackNavigator<AuthRoutesParamsList>();

export default function AuthRoutes() {
  return <Stack.Navigator screenOptions={{
    headerShown: false,
  }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
}