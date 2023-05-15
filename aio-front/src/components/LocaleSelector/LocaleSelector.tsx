import { FC, useCallback, useState } from "react";
import { Appbar, Divider, Menu } from "react-native-paper";
import { useLocalization } from "../../contexts/LocalizationContext";

/**
 * small button for locale selector
 */
const LocaleSelector: FC = () => {
	const [visible, setVisible] = useState(false);

	const { setLocale, t } = useLocalization();

	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	const onPressEnglish = useCallback(() => {
		setLocale("en");
	}, [setLocale]);

	const onPressHebrew = useCallback(() => {
		setLocale("en");
	}, [setLocale]);

	const onPressArabic = useCallback(() => {
		setLocale("ar");
	}, [setLocale]);

	return (
		<Menu
			visible={visible}
			onDismiss={closeMenu}
			anchor={<Appbar.Action icon={"earth"} onPress={openMenu} />}
		>
			<Menu.Item onPress={onPressEnglish} title={t("english")} />
			<Divider />
			<Menu.Item onPress={onPressHebrew} title={t("hebrew")} />
			<Divider />
			<Menu.Item onPress={onPressArabic} title={t("arabic")} />
		</Menu>
	);
};

export default LocaleSelector;
