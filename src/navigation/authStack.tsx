import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
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

import styledHeaderOptions from './headerConfig';
import IconButton from '../components/IconButton';
import CustomAlert from '../components/CustomAlert';

const AuthStack = createStackNavigator();

export default function AuthenticatedStack() {
  const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
  const [teamToDelete, setTeamToDelete] = React.useState(-1);

  const navigation = useNavigation();

  const handleLogout = async () => {
    //TODO: Fix navigation animation
    try {
      auth().signOut();
    } catch {
      Alert.alert('There was an error logging out');
    }
  };

  const handleShowDeleteAlert = (team?: any) => {
    if (!showDeleteAlert) {
      return null;
    }

    return (
      <CustomAlert
        title={'Wait, this action is irrevesible!'}
        text={`Are you sure you want to delete the team ${team.name}?`}
        onPress={() => handleDeleteTeam(team)}
        onCancel={() => setShowDeleteAlert(false)}
        isVisible
      />
    );
  };

  const handleDeleteTeam = (team: any) => {
    setShowDeleteAlert(false);

    database()
      .ref(`/teams/${team.id}`)
      .set(null)
      .then(() => navigation.goBack())
      .catch(() => Alert.alert('There was an error deleting your team'));
  };

  const handleDeletePress = (teamInDeletion: any) => {
    setShowDeleteAlert(true);
    setTeamToDelete(teamInDeletion);
  };

  return (
    <>
      {handleShowDeleteAlert(teamToDelete)}
      <AuthStack.Navigator initialRouteName={authRoutes.TEAMS}>
        <AuthStack.Screen
          name={authRoutes.TEAMS}
          component={Teams}
          options={{
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
          }}
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
          options={({route}: any) => ({
            ...styledHeaderOptions,
            headerRight: route.params.team
              ? () => {
                  return (
                    <Div pr="md">
                      <FilledButton
                        buttonColor="pokemonDarkBlue"
                        textColor="red500"
                        onPress={() => handleDeletePress(route.params.team)}
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
    </>
  );
}
