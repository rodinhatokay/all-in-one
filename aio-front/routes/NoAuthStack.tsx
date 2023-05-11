import React, {FC} from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NoAuthStack} from './types';
import LoginScreen from '../screens/LoginScreen';

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator<NoAuthStack>();

const NoAuthRouter: FC = () => {
 
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        options={{title: 'signIn'}}
        component={LoginScreen}
      />
      <Stack.Screen name="Register" component={LoginScreen} />
      <Stack.Screen name="Intro" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default NoAuthRouter;
