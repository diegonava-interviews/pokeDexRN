import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import database from '@react-native-firebase/database';
import {Alert} from 'react-native';
import {Div} from 'react-native-magnus';
import auth from '@react-native-firebase/auth';

import {authRoutes} from '../constants/navigation';

import FilledButton from '../components/Button';

import Teams from '../screens/Teams';

import Regions from '../screens/Regions';
import Pokedexs from '../screens/Pokedexs';
import Pokemons from '../screens/Pokemons';
import TeamDetails from '../screens/TeamDetails';

import theme from '../theme';
import IconButton from '../components/IconButton';

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
  const handleLogout = async () => {
    auth().signOut();
  };

  const handleDeleteTeam = (team: any, navigation: any) => {
    console.log('%c⧭ team', 'color: #00b300', team);
    database()
      .ref(`/teams/${team.id}`)
      .set(null)
      .then(() => navigation.goBack())
      .catch(() => Alert.alert('There was an error deleting your team'));
  };

  return (
    <AuthStack.Navigator initialRouteName={authRoutes.TEAMS}>
      <AuthStack.Screen
        name={authRoutes.TEAMS}
        component={Teams}
        options={({navigation}) => ({
          ...styledHeaderOptions,
          headerRight: () => (
            <Div pr="md">
              <FilledButton
                buttonColor="pokemonDarkBlue"
                textColor="red500"
                onPress={handleLogout}
                text="Logout"
                fontSize="md"
              />
            </Div>
          ),
          headerLeft: () => (
            <Div pl="2xl">
              <IconButton
                iconName="plus"
                iconColor="white"
                bgColor="pokemonLightBlue"
                iconFamily="FontAwesome"
                iconSize="sm"
                onPress={() => navigation.navigate(authRoutes.REGIONS)}
              />
            </Div>
          ),
        })}
      />

      <AuthStack.Screen
        name={authRoutes.REGIONS}
        component={Regions}
        options={{...styledHeaderOptions}}
      />
      <AuthStack.Screen
        name={authRoutes.POKEDEXS}
        component={Pokedexs}
        options={{...styledHeaderOptions}}
      />
      <AuthStack.Screen
        name={authRoutes.POKEMONS}
        component={Pokemons}
        options={{...styledHeaderOptions}}
      />
      <AuthStack.Screen
        name={authRoutes.TEAM_DETAILS}
        component={TeamDetails}
        options={({navigation, route}: any) => ({
          ...styledHeaderOptions,
          headerRight: route.params.team
            ? () => {
                return (
                  <Div pr="md">
                    <FilledButton
                      buttonColor="pokemonDarkBlue"
                      textColor="red500"
                      onPress={() =>
                        handleDeleteTeam(route.params.team, navigation)
                      }
                      text="Delete"
                      fontSize="md"
                    />
                  </Div>
                );
              }
            : () => null,
        })}
      />
    </AuthStack.Navigator>
  );
}
