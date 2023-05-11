import React, {FC} from 'react';
import {HomeStack} from './types';

import {NavigatorScreenParams} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackScreen from './HomeStackScreen';

type BottomTabParams = {
  HomeStack: NavigatorScreenParams<HomeStack>;
  TabAlbums: undefined;
  TabContacts: undefined;
  TabChat: undefined;
};
// const Stack = createStackNavigator();

const BottomTabs = createBottomTabNavigator<BottomTabParams>();

const Routes: FC = () => {
  return (
    <BottomTabs.Navigator screenOptions={{headerShown: false}}>
      <BottomTabs.Screen name="HomeStack" component={HomeStackScreen} />
    </BottomTabs.Navigator>
  );
};

export default Routes;
