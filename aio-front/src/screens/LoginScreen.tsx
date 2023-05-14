import React from "react";
import {
	StyleSheet,
	Dimensions,
	View,
	I18nManager,
	Text as TextRN,
} from "react-native";
import Text from "../components/partials/Text";
import { Button } from "react-native-paper";
import { useLocalization } from "../contexts/LocalizationContext";
// import {Image} from '../components/partials/Image';
// import TextInput from '../components/partials/TextInput';
// import Screen from '../components/Screen';
// import useLogin from '../hooks/useLogin';

/**
 * Login screen
 */
const LoginScreen = () => {
	const { setLocale } = useLocalization();
	return (
		<View>
			<Button onPress={() => setLocale("he")}>set to hebrew</Button>
			<Text>{I18nManager.isRTL ? " RTL" : " LTR"}</Text>
			<Text variant="bodyLarge">שלום</Text>
			<Text variant="displayMedium">שלום</Text>
			<TextRN style={{ fontSize: 30 }}>שלום</TextRN>

			<Button onPress={() => setLocale("en")}>set to english</Button>
		</View>
	);
	// const {loading, password, setPassword, setUserName, userName, login} =
	//   useLogin();
	// const t = useTranslate();

	// return (
	//   <Screen style={styles.main}>
	//     <TextInput
	//       style={styles.textInput}
	//       mode="flat"
	//       value={userName}
	//       placeholder={t('username')}
	//       onChangeText={setUserName}
	//     />
	//     <TextInput
	//       mode="flat"
	//       value={password}
	//       style={styles.textInput}
	//       secureTextEntry={!!password.length}
	//       placeholder={t('password')}
	//       onChangeText={setPassword}
	//     />
	//     <Button
	//       mode="contained"
	//       style={styles.button}
	//       loading={loading}
	//       onPress={login}>
	//       {loading ? t('loading') : t('login')}
	//     </Button>
	//     <Image
	//       source={require('../assets/loginbg.png')}
	//       style={styles.image}
	//       resizeMode={'contain'}
	//     />
	//   </Screen>
	// );
};

const styles = StyleSheet.create({
	main: {
		marginTop: 25,
	},
	textInput: {
		height: 50,
		marginHorizontal: 25,
		marginVertical: 25,
		backgroundColor: "#ffffff",
	},
	button: {
		marginHorizontal: 25,
	},
	image: {
		height: Dimensions.get("screen").height / 3,
		width: "100%",
		alignSelf: "center",
	},
});

export default LoginScreen;
