import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { useAuth } from "../../contexts/AuthContext";
import { useLocalization } from "../../contexts/LocalizationContext";

export type DialogRef = {
	showDialog: () => void;
	hideDialog: () => void;
};

const LogoutDialog = forwardRef<DialogRef>((props, ref) => {
	const [visible, setVisible] = useState(false);

	const showDialog = () => {
		setVisible(true);
	};

	const hideDialog = () => {
		setVisible(false);
	};

	const { signOut } = useAuth();

	const { t } = useLocalization();

	useImperativeHandle(ref, () => {
		return {
			showDialog: showDialog,
			hideDialog: hideDialog,
		};
	});

	const logout = () => {
		hideDialog();
		signOut();
	};

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={hideDialog}>
				<Dialog.Title>{t("logOut")}</Dialog.Title>
				<Dialog.Content>
					<Text>{t("areYouSureYouWantToLogOut")}</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={logout}>{t("yes")}</Button>
					<Button onPress={hideDialog}>{t("no")}</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
});

LogoutDialog.displayName = "logout dialog";

export default LogoutDialog;
