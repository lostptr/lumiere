import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { fetchLoggedUser, login } from "@store/reducers/user";
import { RootState, useAppDispatch } from "@store/store";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, ActivityIndicator, Portal, Snackbar } from "react-native-paper";
import { useSelector } from "react-redux";
import { AuthRoutesParamsList } from "src/routes/Auth";

type LoginProps = NativeStackScreenProps<AuthRoutesParamsList, 'Login'>

export default function Login({ navigation }: LoginProps) {
  const dispatch = useAppDispatch();

  const userStore = useSelector((state: RootState) => state.user);
  const [email, setEmail] = useState('leosavis@gmail.com');
  const [password, setPassword] = useState('s8DVu0As');
  const [showPassword, setShowPassword] = useState(false);
  const [isFetchingSession, setFetchingSession] = useState(false);
  const [isShowingSnackbar, setShowingSnackbar] = useState(userStore.status === "failed");

  const loading = userStore.status === "loading";
  const canLogin = !!email && !!password && !loading;

  // Check if user is already logged.
  useEffect(() => {
    setFetchingSession(true);
    dispatch(fetchLoggedUser())
      .unwrap()
      .then(() => setFetchingSession(false))
      .catch(() => setFetchingSession(false));
  }, []);

  const doLogin = () => {
    dispatch(login({ email, password }));
  };

  const doSignUp = () => {
    navigation.navigate("SignUp");
  };

  return <>
    {!isFetchingSession &&
      <>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text variant="displayLarge">lumiére</Text>
            <Text variant="titleSmall">A note taking app</Text>
          </View>

          <TextInput mode="outlined"
            value={email}
            disabled={loading}
            onChangeText={setEmail}
            label="Email"
          />

          <TextInput
            mode="outlined"
            label="Password"
            value={password}
            disabled={loading}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            right={<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)} />}
          />

          <Button
            style={{ marginTop: 12 }}
            loading={loading}
            mode="contained"
            disabled={!canLogin}
            onPress={doLogin}>
            Login
          </Button>

          <Button mode="outlined" onPress={doSignUp}>
            Register
          </Button>
        </View>

        <Portal>
          <Snackbar
            visible={isShowingSnackbar}
            onDismiss={() => setShowingSnackbar(false)}>
            {userStore.error?.message}
          </Snackbar>
        </Portal>
      </>
    }

    {isFetchingSession &&
      <ActivityIndicator size={48} style={{ flex: 1 }} />
    }
  </>
}


const styles = StyleSheet.create({
  container: {
    padding: 32,
    flex: 1,
    justifyContent: 'center',
    rowGap: 16,
  },

  titleContainer: {
    marginBottom: 12,
  },

});