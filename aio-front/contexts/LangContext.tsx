import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {useTranslation as useTranslateI18Next} from 'react-i18next';
import {Alert, I18nManager, Platform} from 'react-native';
import CodePush from 'react-native-code-push';
import {Language} from '../localization/i18n';

const LangContext = React.createContext<string | undefined>(undefined);

const LangUpdateContext = React.createContext<
  ((lang: Language) => Promise<void>) | undefined
>(undefined);

const TranslateContext = React.createContext<(t: string) => string>(t => t);

export const useLang = () => {
  return useContext(LangContext);
};

export const useLangUpdate = () => {
  return useContext(LangUpdateContext);
};

export const useTranslate = () => {
  return useContext(TranslateContext);
};

const LangProvider: FC<{children: ReactNode}> = ({children}) => {
  const [lang, setLang] = useState<Language>('he');
  const {t, i18n} = useTranslateI18Next();

  const changeLang = useCallback(
    async (_lang: Language, hideAlert: boolean = false) => {
      // change lang here
      i18n.changeLanguage(_lang);
      const isRestart = shouldRestartForLayout(_lang);

      const executeLangChange = async () => {
        await storeLocalLang(_lang);

        if (isRestart) {
          restart();
          return;
        }
      };

      if (isRestart && !hideAlert) {
        Alert.alert('הפעלה מחדש נדרשת', `החלף שפה  RTL:${I18nManager.isRTL}`, [
          {
            text: 'ביטול',
            style: 'cancel',
          },
          {text: 'אישור', onPress: executeLangChange},
        ]);
      } else {
        executeLangChange();
      }
      setLang(_lang);
    },
    [setLang, i18n],
  );

  useEffect(() => {
    const handleInitLang = async () => {
      const storedLang = await getLocalLang();
      console.log('PLAT', Platform.OS, 'isRTL', I18nManager.isRTL);
      const currentLan = storedLang ? storedLang : 'he';
      if (storedLang && storedLang !== currentLan) {
        // already stored something
        console.log('hello changing lang');
        await changeLang(storedLang, true);
      } else {
        await storeLocalLang(currentLan);
        const isRestart = shouldRestartForLayout(currentLan);
        if (isRestart) {
          restart();
        } else {
          changeLang(currentLan);
        }
      }
    };

    handleInitLang();
  }, [changeLang]);

  return (
    <LangContext.Provider value={lang}>
      <LangUpdateContext.Provider value={changeLang}>
        <TranslateContext.Provider value={t}>
          {children}
        </TranslateContext.Provider>
      </LangUpdateContext.Provider>
    </LangContext.Provider>
  );
};

const restart = () => {
  CodePush.restartApp();
};

const storeLocalLang = async (lang: Language) => {
  try {
    await AsyncStorage.setItem('localLang', lang);
  } catch (e) {
    console.log('error ');
    throw new Error('error strong local lang');
  }
};

const getLocalLang = async (): Promise<Language | null> => {
  try {
    const localLang = await AsyncStorage.getItem('localLang');
    return localLang ? (localLang as Language) : null;
  } catch (e) {
    console.log('error getting Local lang');
    throw new Error('error getting local lang');
  }
};

const shouldRestartForLayout = (localLang: string) => {
  let isRestart = false;
  if (localLang === 'he' || localLang === 'ar') {
    // should be RTL
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
      isRestart = true;
    }
  } else {
    // should be LTR
    if (I18nManager.isRTL) {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
      isRestart = true;
    }
  }
  return isRestart;
};

export default LangProvider;
