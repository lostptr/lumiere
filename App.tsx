import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, } from 'react-native';
import { Routes } from './src/routes';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});

export default App;
