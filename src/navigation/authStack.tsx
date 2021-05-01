import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {authRoutes} from '../constants/navigation';

import Regions from '../screens/Regions';
import Teams from '../screens/Teams';
import Pokedexs from '../screens/Pokedexs';
import Pokemons from '../screens/Pokemons';

import theme from '../theme';

const AuthStack = createStackNavigator();

const styledHeaderOptions = {
  headerRight: () => null,
  headerTitleStyle: {
    color: theme.colors.pokemonYellow,
    fontSize: 24,
  },
  headerBackTitleVisible: false,
  headerTintColor: 'lightgray',
  headerStyle: {
    backgroundColor: theme.colors.pokemonDarkBlue,
    shadowOffset: {height: 0, width: 0},
  },
};

export default function AuthenticatedStack() {
  return (
    <AuthStack.Navigator initialRouteName={authRoutes.TEAMS}>
      <AuthStack.Screen
        name={authRoutes.TEAMS}
        component={Teams}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name={authRoutes.REGIONS}
        component={Regions}
        options={styledHeaderOptions}
      />
      <AuthStack.Screen
        name={authRoutes.POKEDEXS}
        component={Pokedexs}
        options={styledHeaderOptions}
      />
      <AuthStack.Screen
        name={authRoutes.POKEMONS}
        component={Pokemons}
        options={styledHeaderOptions}
      />
    </AuthStack.Navigator>
  );
}
