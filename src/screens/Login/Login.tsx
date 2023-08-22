import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createAccount, loginWithEmail } from "@services/supabase";
import { login } from "@store/reducers/user";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { AuthRoutesParamsList } from "src/routes/Auth";
import { User } from "src/types";

type LoginProps = NativeStackScreenProps<AuthRoutesParamsList, 'Login'>

export default function Login({ navigation }: LoginProps) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('leosavis@gmail.com');
  const [password, setPassword] = useState('s8DVu0As');
  const [showPassword, setShowPassword] = useState(false);

  const canLogin = !!email && !!password && !loading;

  const doLogin = async () => {
    setLoading(true);
    try {
      const { error, data } = await loginWithEmail(email, password);

      if (error) {
        Alert.alert('Login Error', error.message);
      }
      else {
        const user: User = {
          id: data.user.id,
          name: data.user.email ?? 'no name'
        };
        dispatch(login(user));
      }
    } catch (err) {
      setLoading(false);
      Alert.alert('Login Error', `${err}`);
    }
  };

  const doSignUp = () => {
    navigation.navigate("SignUp");
  };

  return <View style={styles.container}>

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