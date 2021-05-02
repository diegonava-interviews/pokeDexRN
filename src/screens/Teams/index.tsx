import * as React from 'react';

import {ScrollView} from 'react-native';
import {Div} from 'react-native-magnus';

import {TeamInterface} from '../../models';
import TeamCard from './TeamCard';
import SafeContainer from '../../components/SafeContainer';

import teams from './data';
import {authRoutes} from '../../constants/navigation';

export default function Teams({navigation}: any) {
  const handlePressCard = async (team: TeamInterface) => {
    navigation.navigate(authRoutes.TEAM_DETAILS, {team});
  };

  const _renderTeamCards = () => {
    return teams.map((team, index) => {
      return (
        <TeamCard
          key={`${team.name}${index}`}
          id={team.id}
          name={team.name}
          region={team.region.name}
          pokeDex={`Deck - ${team.pokeDex.name}`}
          onPressCard={() => handlePressCard(team)}
          pokemonsCount={team.pokemons.length}
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
