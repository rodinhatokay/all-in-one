import { View, Text } from "react-native";
import {Provider as PaperProvider} from 'react-native-paper';
import { ThemeContext, useTheme } from "./contexts/ThemeContext";
import Router from "./routes/Router";

export default function App() {
  const {theme} = useTheme();

  return (
   
      <PaperProvider theme={theme}>
          <Router />
      </PaperProvider>
  );
}