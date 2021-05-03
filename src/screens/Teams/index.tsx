import * as React from 'react';
import {useListVals} from 'react-firebase-hooks/database';
import database from '@react-native-firebase/database';

import {ScrollView} from 'react-native';
import {Div} from 'react-native-magnus';

import {TeamInterface} from '../../models';
import TeamCard from './TeamCard';
import SafeContainer from '../../components/SafeContainer';

// import teams from './data';
import {authRoutes} from '../../constants/navigation';

export default function Teams({navigation}: any) {
  const [snapshots, loading, error] = useListVals(database().ref('teams'));

  console.log('%c⧭ error', 'color: #ff0000', error);
  console.log('%c⧭ loading', 'color: #9c66cc', loading);
  console.log('%c⧭ snapshots', 'color: #ace2e6', snapshots);

  const handlePressCard = async (team: TeamInterface) => {
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
      <ScrollView>
        <Div px="xl" py="lg">
          <Div row flexWrap="wrap" pt="lg" justifyContent="space-around">
            {_renderTeamCards()}
          </Div>
        </Div>
      </ScrollView>
    </SafeContainer>
  );
}
