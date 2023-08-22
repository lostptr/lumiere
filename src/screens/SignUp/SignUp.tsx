import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createAccount } from "@services/supabase";
import { login } from "@store/reducers/user";
import { AuthResponse } from "@supabase/supabase-js";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme, MD3Theme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { AuthRoutesParamsList } from "src/routes/Auth";

type SignUpProps = NativeStackScreenProps<AuthRoutesParamsList, 'SignUp'>

export default function SignUp({ navigation }: SignUpProps) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const styles = getStyles(theme);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const updatePasswordsMatch = () => setPasswordsMatch(password === confirmPassword);

  // This clears the error as soon as the passwords match.
  if (!passwordsMatch && password === confirmPassword) {
    updatePasswordsMatch();
  }

  const canSignup = !!email && !!password && !!confirmPassword && !!name && !loading && passwordsMatch;

  const doSignUp = async () => {
    if (password !== confirmPassword) {
      updatePasswordsMatch();
      return;
    }

    setLoading(true);

    const { data, error } = await createAccount(email, password, name);

    if (error) {
      Alert.alert("Sign Up Error", error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      Alert.alert("Confirm email", "An email has been sent to you. Please, check your email inbox to confirm your email address and complete the registration..");
      navigation.navigate('Login');
    }
  };

  return <>
    <View style={{ flexDirection: 'row', padding: 8 }}>
      <Button icon='arrow-left' onPress={navigation.goBack}>Back</Button>
    </View>

    <View style={styles.container}>

      <Text variant="displayMedium" style={styles.titleContainer}>Sign Up</Text>

      <TextInput
        mode="outlined"
        value={name}
        disabled={loading}
        onChangeText={setName}
        label="Name"
      />

      <TextInput
        mode="outlined"
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
        error={!passwordsMatch}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        right={<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)} />}
      />

      <TextInput
        mode="outlined"
        label="Confirm Password"
        value={confirmPassword}
        disabled={loading}
        error={!passwordsMatch}
        onChangeText={setConfirmPassword}
        onBlur={updatePasswordsMatch}
        secureTextEntry={!showPassword}
        right={<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)} />}
      />

      {!passwordsMatch &&
        <View style={styles.errorContainer}>
          <Icon name="alert-circle" size={16} color={theme.colors.error} />
          <Text variant="labelMedium" style={{ color: theme.colors.error }}>
            Passwords must match.
          </Text>
        </View>
      }

      <Button
        style={{ marginTop: 12 }}
        loading={loading}
        mode="contained"
        disabled={!canSignup}
        onPress={doSignUp}>
        Sign Up
      </Button>

    </View>
  </>

}

const getStyles = (theme: MD3Theme) => StyleSheet.create({
  container: {
    padding: 32,
    flex: 1,
    justifyContent: 'center',
    rowGap: 16,
  },

  titleContainer: {
    marginBottom: 12,
  },

  errorContainer: {
    flexDirection: 'row',
    columnGap: 8,
    alignContent: 'stretch',
  }
});