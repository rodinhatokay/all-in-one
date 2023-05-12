import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { useAuth } from "../contexts/AuthContext";
import FONTS from "../constants/Fonts";

const useInitApp = () => {
	const [appIsReady, setAppIsReady] = useState(false);
	const { isLoading: isAuthLoading } = useAuth();

	useEffect(() => {
		async function prepare() {
			try {
				// Pre-load fonts, make any API calls you need to do here
				await Font.loadAsync(FONTS);
				// Artificially delay for two seconds to simulate a slow loading
				// experience. Please remove this if you copy and paste the code!
				await new Promise((resolve) => setTimeout(resolve, 2000));
			} catch (e) {
				console.warn(e);
			} finally {
				// Tell the application to render
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	return { appIsReady: appIsReady && !isAuthLoading };
};

export default useInitApp;
