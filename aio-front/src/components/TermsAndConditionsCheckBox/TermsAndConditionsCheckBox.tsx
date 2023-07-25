import { FC, useCallback, useState } from 'react';
import {
	StyleSheet,
	Pressable,
	View,
	Dimensions,
	ScrollView,
} from 'react-native';
import {
	Checkbox,
	Dialog,
	HelperText,
	Portal,
	Button,
	Text,
} from 'react-native-paper';
import { useLocalization } from '../../contexts/LocalizationContext';
import { useTheme } from '../../contexts/ThemeContext';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { useTermsAndConditions } from '../../hooks/useTermsAndConidtions';

interface Props {
	checked: boolean;
	onCheck: (val: boolean) => void;
	error: boolean;
}

const TermsAndConditionsCheckBox: FC<Props> = (props) => {
	const { data: termsContent, isError, isLoading } = useTermsAndConditions();
	const { checked, error, onCheck } = props;
	const { t } = useLocalization();
	const { theme } = useTheme();
	const [isDisplayTAC, setIsDisplayTAC] = useState(false);

	const displayTermsAndConditions = () => setIsDisplayTAC(true);

	const hideTAC = () => setIsDisplayTAC(false);

	const windowWidth = useWindowDimensions().width;

	const _onCheck = useCallback(() => {
		if (isError || isLoading) return;
		onCheck(!checked);
	}, [isError, isLoading, checked]);

	return (
		<>
			<Pressable onPress={_onCheck}>
				<View style={styles.checkboxContainer}>
					<Checkbox.Android status={checked ? 'checked' : 'unchecked'} />
					<View style={styles.textContainer}>
						<Text>{t('iAgreeToThe')}</Text>
						<Pressable hitSlop={20} onPress={displayTermsAndConditions}>
							<Text
								style={[
									styles.termsAndCondidtionsTxt,
									{ color: theme.colors.primary },
								]}
							>
								{' '}
								{t('termsAndConditions')}
							</Text>
						</Pressable>
					</View>
				</View>
				<HelperText type="error" visible={error}>
					{t('pleaseAccpetTheTermsAndConditionsToProceed')}
				</HelperText>
			</Pressable>
			<Portal>
				<Dialog
					onDismiss={hideTAC}
					visible={isDisplayTAC}
					style={styles.dialog}
				>
					<Dialog.ScrollArea style={styles.noPadding}>
						<ScrollView style={styles.smallPadding}>
							<ScrollView horizontal>
								<RenderHtml
									source={{ html: termsContent }}
									contentWidth={windowWidth}
									ignoredStyles={[
										'paddingTop',
										'paddingLeft',
										'paddingBottom',
										'paddingRight',
									]}
								/>
							</ScrollView>
						</ScrollView>
					</Dialog.ScrollArea>
					<Dialog.Actions>
						<Button onPress={hideTAC}>Ok</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</>
	);
};

const styles = StyleSheet.create({
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-start',
	},
	termsAndCondidtionsTxt: { textDecorationLine: 'underline' },
	smallPadding: {
		paddingHorizontal: 15,
	},
	noPadding: {
		paddingHorizontal: 0,
	},
	textContainer: { flexDirection: 'row', alignItems: 'center' },
	dialog: { maxHeight: 0.6 * Dimensions.get('window').height },
});

export default TermsAndConditionsCheckBox;
