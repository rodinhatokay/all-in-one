import { Provider as PaperProvider } from "react-native-paper";
import { useTheme } from "./src/contexts/ThemeContext";
import Router from "./src/routes/Router";
import { AuthProvider } from "./src/contexts/AuthContext";
import { LocalizationProvider } from "./src/contexts/LocalizationContext";

export default function App() {
	const { theme } = useTheme();

	return (
		<AuthProvider>
			<LocalizationProvider>
				<PaperProvider theme={theme}>
					<Router />
				</PaperProvider>
			</LocalizationProvider>
		</AuthProvider>
	);
}
