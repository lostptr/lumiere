import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, } from 'react-native';
import { Routes } from './src/routes';
import { Portal } from 'react-native-paper';
import { Snackbar } from '@services/snackbar';

function App(): JSX.Element {
  return <>
    <NavigationContainer>
      <Routes />
    </NavigationContainer>

    <Portal>
      <Snackbar />
    </Portal>
  </>
}

const styles = StyleSheet.create({
});

export default App;
