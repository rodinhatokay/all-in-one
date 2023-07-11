import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider, useTheme } from "./src/contexts/ThemeContext";
import Router from "./src/routes/Router";
import { AuthProvider } from "./src/contexts/AuthContext";
import { LocalizationProvider } from "./src/contexts/LocalizationContext";
import { StatusBar } from "expo-status-bar";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

const App = () => {
	const { theme, isThemeDark } = useTheme();

	return (
		<PaperProvider theme={theme}>
			<StatusBar style={isThemeDark ? "light" : "dark"} />
			<Router />
		</PaperProvider>
	);
};

const AppWrapper = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<LocalizationProvider>
					<ThemeProvider>
						<App />
					</ThemeProvider>
				</LocalizationProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
};

export default AppWrapper;
