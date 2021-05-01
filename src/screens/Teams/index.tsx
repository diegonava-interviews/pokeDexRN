import * as React from 'react';
import auth from '@react-native-firebase/auth';

import {SafeAreaView, ScrollView} from 'react-native';
import {Div} from 'react-native-magnus';

import FilledButton from '../../components/Button';
import CustomAlert from '../../components/CustomAlert';
import CustomText from '../../components/CustomText';
import TeamCard from './TeamCard';

import teamsMock from './data';
import {authRoutes} from '../../constants/navigation';

export default function Teams({navigation}: any) {
  const [teams, setTeams] = React.useState(teamsMock);
  const [teamToDelete, setTeamToDelete] = React.useState(-1);

  const handleLogout = async () => {
    auth().signOut();
  };

  const handleEditTeam = (id: string) => {
    console.log('editTeam: ', id);
  };

  const handleDeleteTeam = (id: number) => {
    const filteredTeams = teams.filter(team => team.id !== id);
    setTeamToDelete(-1);
    setTeams(filteredTeams);
  };

  const _renderDeleteAlert = () => {
    if (teamToDelete === -1) {
      return null;
    }

    const _teamName = teams.find(team => team.id === teamToDelete)?.name ?? '';

    return (
      <CustomAlert
        title={'Wait, this action is irrevesible!'}
        text={`Are you sure you want to delete the team ${_teamName}?`}
        onPress={() => handleDeleteTeam(teamToDelete)}
        onCancel={() => setTeamToDelete(-1)}
        isVisible
      />
    );
  };

  const _renderTeamCards = () => {
    return teams.map((team, index) => {
      const properCaseName = `${team.name[0].toUpperCase()}${team.name.slice(
        1,
      )}`;

      return (
        <TeamCard
          key={`${team.name}${index}`}
          id={team.id}
          name={properCaseName}
          region={team.regionName}
          onPressCard={() => console.log('onPressCard: ', team.regionName)}
          onPressEdit={() => handleEditTeam(team.regionName)}
          onPressDelete={() => setTeamToDelete(team.id)}
          pokemonsCount={team.pokemons.length}
        />
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#003A70'}}>
      {_renderDeleteAlert()}

      <Div
        px="xl"
        pb="lg"
        row
        justifyContent="space-between"
        alignItems="center">
        <CustomText variant="title" text="Pokemon Teams" />
        <FilledButton
          onPress={() => navigation.navigate(authRoutes.REGIONS)}
          text="Agregar Equipo"
          fontSize="sm"
        />
      </Div>

      <ScrollView>
        <Div px="xl" py="lg">
          <Div row flexWrap="wrap" pt="lg" justifyContent="space-around">
            {_renderTeamCards()}
          </Div>

          <Div py="2xl" alignItems="center">
            <FilledButton onPress={handleLogout} text="Logout" fontSize="lg" />
          </Div>
        </Div>
      </ScrollView>
    </SafeAreaView>
  );
}
