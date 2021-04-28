import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {unAuthRoutes, authRoutes} from '../constants/navigation';

import Regions from '../screens/Regions';
import Teams from '../screens/Teams';

const AuthStack = createStackNavigator();

export default function AuthenticatedStack() {
  return (
    <AuthStack.Navigator initialRouteName={authRoutes.REGIONS}>
      <AuthStack.Screen
        name={authRoutes.REGIONS}
        component={Regions}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name={authRoutes.TEAMS}
        component={Teams}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
}
