import { Provider as PaperProvider } from "react-native-paper";
import { useTheme } from "./src/contexts/ThemeContext";
import Router from "./src/routes/Router";
import { AuthProvider } from "./src/contexts/AuthContext";

export default function App() {
	const { theme } = useTheme();

	return (
		<AuthProvider>
			<PaperProvider theme={theme}>
				<Router />
			</PaperProvider>
		</AuthProvider>
	);
}
