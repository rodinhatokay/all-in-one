import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider, useTheme } from "./src/contexts/ThemeContext";
import Router from "./src/routes/Router";
import { AuthProvider } from "./src/contexts/AuthContext";
import { LocalizationProvider } from "./src/contexts/LocalizationContext";

const App = () => {
	const { theme } = useTheme();

	return (
		<PaperProvider theme={theme}>
			<Router />
		</PaperProvider>
	);
};

const AppWrapper = () => {
	return (
		<AuthProvider>
			<LocalizationProvider>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</LocalizationProvider>
		</AuthProvider>
	);
};

export default AppWrapper;
