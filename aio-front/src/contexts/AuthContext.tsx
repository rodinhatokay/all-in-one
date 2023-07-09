import {
	createContext,
	useState,
	useContext,
	useEffect,
	useCallback,
	ReactNode,
	FC,
} from "react";
import api, {
	getStoredApiToken,
	removeStoredApiToken,
	storeApiToken,
} from "../services/api/api";
import { User } from "../services/user/user.types";
import { getCurrentUserApi } from "../services/user/userApi";

interface AuthContextProps {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	signIn: (access_token: string, user?: User) => Promise<void>;
	signOut: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

/**
 * auth provider to app
 * provides all logic and data related to auth
 * also holds instance user
 */
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadUserFromStorage = async () => {
			try {
				const token = await getStoredApiToken();
				const { data: user } = await getCurrentUserApi(token);
				if (token) {
					api.defaults.headers.Authorization = `Bearer ${token}`;
					if (user) setUser(user);
				}

				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.error("error initing user from local local storage", error);
			}
		};

		setLoading(false);

		console.warn("need to enable user auth");
		loadUserFromStorage();
	}, []);

	/**
	 * stores in app the token and user
	 * and sets users as logged in
	 */
	const setAuthInAppByAccessToken = useCallback(
		async (access_token: string, user?: User) => {
			storeApiToken(access_token);
			api.defaults.headers.Authorization = `Bearer ${access_token}`;
			if (!user) {
				// if user wasnt provided
				const { data } = await getCurrentUserApi(access_token);
				user = data;
			}
			setUser(user);
		},
		[setUser],
	);

	/**
	 * sign in user in app
	 */
	const signIn = useCallback(async (access_token: string, user?: User) => {
		await setAuthInAppByAccessToken(access_token, user);
		// console.error("neeed to implment signIn");
	}, []);

	const signOut = () => {
		removeStoredApiToken();
		setUser(null);
		delete api.defaults.headers.Authorization;
	};

	const context: AuthContextProps = {
		isAuthenticated: user ? true : false,
		user,
		signIn,
		isLoading: loading,
		signOut,
	};
	if (loading) return null;
	return (
		<AuthContext.Provider value={context}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
