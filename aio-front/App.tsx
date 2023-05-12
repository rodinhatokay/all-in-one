import { Provider as PaperProvider } from "react-native-paper";
import { useTheme } from "./src/contexts/ThemeContext";
import Router from "./src/routes/Router";
import { AuthProvider } from "./src/contexts/AuthContext";
import LangProvider from "./src/contexts/LangContext";

export default function App() {
	const { theme } = useTheme();

	return (
		<AuthProvider>
			<LangProvider>
				<PaperProvider theme={theme}>
					<Router />
				</PaperProvider>
			</LangProvider>
		</AuthProvider>
	);
}
