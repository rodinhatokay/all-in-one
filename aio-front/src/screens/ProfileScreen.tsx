import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import { ThemeMode, useTheme } from '../contexts/ThemeContext';
import AnimatedLottieView from 'lottie-react-native';
import Title from '../sections/Settings/Title';
import { useLocalization } from '../contexts/LocalizationContext';
import LogoutDialog, {
	DialogRef,
} from '../components/DialogLogout/DialogLogout';
import DeleteAccountDialog from '../components/DeleteAccountDialog/DeleteAccountDialog';
import { useIsMobile } from '../hooks/usePlatform';
// import { RouteProp, useRoute } from '@react-navigation/native';
// import { RootNavigation } from '../routes/types';

// type SettingsScreenRouteProp = RouteProp<RootNavigation, 'profileTab'>;

const ProfileScreen = () => {
	// const route = useRoute<SettingsScreenRouteProp>(); // for later use
	// console.log('displayDeleteUser', route?.params?.displayDeleteUser);

	const { changeTheme, mode, theme } = useTheme();
	const { t } = useLocalization();
	const isMobile = useIsMobile();

	const logoutDialogRef = useRef<DialogRef>(null);

	const deleteAccountDialogRef = useRef<DialogRef>(null);

	const openLogoutDialog = () => {
		logoutDialogRef.current?.showDialog();
	};

	const openDeleteAccountDialog = () => {
		deleteAccountDialogRef.current?.showDialog();
	};

	return (
		<View style={styles.main}>
			<Title>{t('appearances')}</Title>
			<RadioButton.Group
				onValueChange={(val) => changeTheme(val as ThemeMode)}
				value={mode}
			>
				<RadioButton.Item
					label="Automatic (follow device setting)"
					value="deviceTheme"
				/>
				<RadioButton.Item label="Light theme" value="light" />
				<RadioButton.Item label="Dark theme" value="dark" />
			</RadioButton.Group>
			<View
				style={{
					flexDirection: 'row',
					// flex: 1,
					marginHorizontal: 10,
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Button
					mode="text"
					onPress={openLogoutDialog}
					style={styles.logoutButton}
				>
					{t('logOut')}
				</Button>
				<Button
					mode={'text'}
					textColor={theme.colors.error}
					onPress={openDeleteAccountDialog}
				>
					delete account
				</Button>
			</View>

			<View style={styles.animationContainer}>
				{isMobile && (
					<AnimatedLottieView
						source={require('../../assets/lottieAnimations/profile-lock.json')}
						style={styles.animation}
						resizeMode="contain"
						loop
						autoPlay
					/>
				)}
			</View>
			<LogoutDialog ref={logoutDialogRef} />
			<DeleteAccountDialog ref={deleteAccountDialogRef} />
		</View>
	);
};

const styles = StyleSheet.create({
	main: {
		flex: 1,
	},

	logoutButton: {
		marginTop: 10,
		// marginHorizontal: 10,
		alignSelf: 'flex-start',
	},
	animationContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	animation: {
		height: 250,
		width: 250,
	},
});

export default ProfileScreen;
