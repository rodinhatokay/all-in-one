import {NavigationContainer} from '@react-navigation/native';
import {useTheme} from '../contexts/ThemeContext';


import NoAuthRouter from './NoAuthStack';
import {navigationRef} from './routerActions';
import Routes from './Routes';

/**
 * router handler
 */
const Router = () => {
  const {theme} = useTheme();
  const {loggedIn} = { loggedIn: false}

  // const {loading} = useInitApp();
  // useNotifications();

  // if (loading) {
  //   return null;
  // }
  return (
    <NavigationContainer theme={theme} ref={navigationRef}>
      {!loggedIn ? <NoAuthRouter /> : <Routes />}
    </NavigationContainer>
  );
};

export default Router;
