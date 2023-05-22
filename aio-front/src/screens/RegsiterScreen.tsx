import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
	Button,
	TextInput,
	Checkbox,
	Text,
	TouchableRipple,
} from "react-native-paper";

const RegisterScreen = () => {
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

	const validateFields = () => {
		if (firstName.trim() === "" || lastName.trim() === "") {
			Alert.alert("Error", "First name and last name cannot be empty.");
			return false;
		}

		if (!termsAccepted) {
			Alert.alert(
				"Error",
				"You must accept the terms and conditions to register."
			);
			return false;
		}

		return true;
	};

	const register = () => {
		if (validateFields()) {
			// Implement your registration functionality here
			console.log(firstName, lastName, phoneNumber, termsAccepted);
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				label="First Name"
				value={firstName}
				style={styles.textInput}
				onChangeText={setFirstName}
			/>
			<TextInput
				label="Last Name"
				value={lastName}
				style={styles.textInput}
				onChangeText={setLastName}
			/>
			<TextInput
				label="Phone Number"
				value={"0524560793"}
				disabled
				style={styles.textInput}
				onChangeText={setPhoneNumber}
			/>
			<TouchableRipple
				onPress={() => setTermsAccepted(!termsAccepted)}
				style={{ justifyContent: "center" }}
			>
				<View style={styles.checkboxContainer}>
					<Checkbox
						status={termsAccepted ? "checked" : "unchecked"}
						onPress={() => {
							setTermsAccepted(!termsAccepted);
						}}
					/>
					<Text>I agree to the Terms and Conditions</Text>
				</View>
			</TouchableRipple>
			<Button mode="contained" onPress={register} style={{ margin: 15 }}>
				Register
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: "center",
		padding: 16,
		gap: 20,
	},
	textInput: { backgroundColor: "white" },
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-start",
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
});

export default RegisterScreen;
