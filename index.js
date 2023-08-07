import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

const theme = {
  ...DefaultTheme,
  version: 3,
}

export default function Main() {
  return (
    // <Provider store={store}>
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
    // </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
