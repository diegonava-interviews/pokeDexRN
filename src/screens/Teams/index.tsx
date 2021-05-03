import * as React from 'react';
import {useListVals} from 'react-firebase-hooks/database';
import database from '@react-native-firebase/database';

import {ScrollView, Alert, ActivityIndicator} from 'react-native';
import {Div} from 'react-native-magnus';

import {TeamInterface} from '../../models';
import TeamCard from './TeamCard';
import SafeContainer from '../../components/SafeContainer';

import {authRoutes} from '../../constants/navigation';

export default function Teams({navigation}: any) {
  const [snapshots, loading, error] = useListVals(database().ref('teams'));

  const handlePressCard = (team: TeamInterface) => {
    navigation.navigate(authRoutes.TEAM_DETAILS, {
      team,
    });
  };

  const _renderTeamCards = () => {
    return snapshots?.map((team: any, index) => {
      return (
        <TeamCard
          key={`${team.name}${index}`}
          id={index + 1}
          name={team.name}
          region={team.region.name}
          pokeDex={team.pokeDex.name}
          onPressCard={() => handlePressCard(team)}
          pokemonsCount={team?.pokemons?.length ?? 0}
        />
      );
    });
  };

  return (
    <SafeContainer>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          <Div px="xl" py="lg">
            <Div row flexWrap="wrap" pt="lg" justifyContent="space-around">
              {snapshots && !loading ? (
                _renderTeamCards()
              ) : (
                <Div pt="3xl">
                  {error && Alert.alert('There was an error getting the data')}
                  <ActivityIndicator size="large" />
                </Div>
              )}
            </Div>
          </Div>
        </ScrollView>
      )}
    </SafeContainer>
  );
}
