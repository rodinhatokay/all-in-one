import { useCallback } from 'react';
import { Business } from '../services/business/business.types';
import { Linking, Platform, Share } from 'react-native';
import { navigate } from '../routes/routerActions';
import { log } from '../services/logger/loggerService';
import { useLocalization } from '../contexts/LocalizationContext';
import { normalizePhoneNumberFormat } from '../services/common/format';

const useBusinessActions = ({
	phoneNumber,
	name,
	hasWhatsapp,
	location,
}: Business) => {
	const { t } = useLocalization();
	const handleCall = useCallback(() => {
		Linking.openURL(`tel:${phoneNumber}`);
	}, [phoneNumber]);

	const handleSendSms = useCallback(() => {
		Linking.openURL(`sms:${phoneNumber}`);
	}, [phoneNumber]);

	const handleShare = useCallback(async () => {
		// logic to share business
		try {
			const result = await Share.share({
				message: `${t('allInOne')} | ${name}: \n${phoneNumber}`,
				// url: "",
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					console.log('result.activityType', result.activityType);
					// shared with activity type of result.activityType
				} else {
					// shared
					console.log('result', result);
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			log('captured error during sharing a business', error);
		}
	}, [name, phoneNumber]);

	const navigateToBusiness = useCallback(() => {
		navigate('homeStack', { screen: 'business' });
	}, []);

	const handleWhatsApp = useCallback(async () => {
		const whatsappURL = `whatsapp://send?phone=${normalizePhoneNumberFormat(
			phoneNumber,
		)}&text=${encodeURIComponent('')}`;

		try {
			await Linking.openURL(whatsappURL);
		} catch (error) {
			console.log('Error opening WhatsApp:', error);
		}
	}, [phoneNumber, hasWhatsapp]);

	const handleLocation = useCallback(() => {
		const scheme = Platform.select({
			ios: 'maps://0,0?q=',
			android: 'geo:0,0?q=',
		});
		const latLng = `${location.latitude},${location.longitude}`;
		const label = name;
		const url = Platform.select({
			ios: `${scheme}${label}@${latLng}`,
			android: `${scheme}${latLng}(${label})`,
		});

		if (!url) {
			console.log('cant open map in none mobile for business location');
			return;
		}

		Linking.openURL(url);
	}, [location, name]);

	return {
		handleCall,
		handleShare,
		navigateToBusiness,
		handleWhatsApp,
		handleSendSms,
		handleLocation,
	};
};

export default useBusinessActions;
