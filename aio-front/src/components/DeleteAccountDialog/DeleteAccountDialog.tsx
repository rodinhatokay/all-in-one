import { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';

export type DialogRef = {
	showDialog: () => void;
	hideDialog: () => void;
};

const DeleteAccountDialog = forwardRef<DialogRef>((props, ref) => {
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const showDialog = () => {
		setVisible(true);
	};

	const hideDialog = () => {
		setVisible(false);
	};

	const { deleteUser } = useAuth();

	const { t } = useLocalization();

	useImperativeHandle(ref, () => {
		return {
			showDialog: showDialog,
			hideDialog: hideDialog,
		};
	});

	const logout = async () => {
		setLoading(true);
		hideDialog();
		await deleteUser();
		setLoading(false);
	};

	return (
		<Portal>
			<Dialog visible={visible} dismissable={!loading} onDismiss={hideDialog}>
				<Dialog.Title>{t('deleteAccount')}</Dialog.Title>
				<Dialog.Content>
					<Text>{t('areYouSureYouWantToDelete')}</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Button loading={loading} onPress={logout}>
						{t('yes')}
					</Button>
					<Button disabled={loading} onPress={hideDialog}>
						{t('no')}
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
});

DeleteAccountDialog.displayName = 'logout dialog';

export default DeleteAccountDialog;
