import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';

import {unAuthRoutes, authRoutes} from '../constants/navigation';

import SignIn from '../screens/SignIn';
import AuthenticatedStack from './authStack';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const MainStack = createStackNavigator();

function RootNavigator() {
  const [user] = useAuthState(auth());

  return (
    <MainStack.Navigator>
      {!user ? (
        <MainStack.Screen
          name={unAuthRoutes.SIGN_IN}
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <MainStack.Screen
          name={authRoutes.AUTHENTICATED}
          component={AuthenticatedStack}
          options={{
            headerShown: false,
          }}
        />
      )}
    </MainStack.Navigator>
  );
}
