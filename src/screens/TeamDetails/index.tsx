import * as React from 'react';

import {ScrollView, Alert, TouchableOpacity} from 'react-native';
import {Div, Icon, Text} from 'react-native-magnus';
import database from '@react-native-firebase/database';

import CustomText from '../../components/CustomText';
import CustomInput from '../../components/CustomInput';
import SafeContainer from '../../components/SafeContainer';

import {authRoutes} from '../../constants/navigation';
import {useSharedState} from '../../store';
import PokemonCard from '../../components/PokemonCard';
import FilledButton from '../../components/Button';

export default function TeamDetails({navigation, route}: any) {
  const existingTeam = route?.params?.team ?? null;
  const [state] = useSharedState();

  const initialTeamName = existingTeam ? existingTeam.name : '';
  const [teamName, setTeamName] = React.useState(initialTeamName);

  const teamDetailsAccessKey = existingTeam ? existingTeam : state;

  const handleSaveTeam = () => {
    if (existingTeam) {
      database()
        .ref(`/teams/${teamDetailsAccessKey.id}`)
        .update({
          name: teamName,
          region: {
            id: teamDetailsAccessKey.region.id,
            name: teamDetailsAccessKey.region.name,
          },
          pokeDex: {
            id: teamDetailsAccessKey.pokeDex.id,
            name: teamDetailsAccessKey.pokeDex.name,
          },
          pokemons: teamDetailsAccessKey.pokemons,
        })
        .then(() =>
          navigation.navigation.reset({
            index: 0,
            routes: [{name: authRoutes.TEAMS}],
          }),
        )
        .catch(() => Alert.alert('There was an error saving your team'));
    }

    database()
      .ref(`/teams/${teamDetailsAccessKey.id}`)
      .set({
        id: teamDetailsAccessKey.id,
        name: teamName,
        region: {
          id: teamDetailsAccessKey.region.id,
          name: teamDetailsAccessKey.region.name,
        },
        pokeDex: {
          id: teamDetailsAccessKey.pokeDex.id,
          name: teamDetailsAccessKey.pokeDex.name,
        },
        pokemons: teamDetailsAccessKey.pokemons,
      })
      .then(() => navigation.popToTop())
      .catch(() => Alert.alert('There was an error saving your team'));
  };

  return (
    <SafeContainer>
      <ScrollView>
        <Div px="xl" pb="md" alignItems="center">
          <CustomText
            variant="subtitle"
            text={
              existingTeam
                ? 'Click on "Region", "Pokedex" or "Edit Pokemons" Buttons to edit your team'
                : 'This is the overview of your selections'
            }
          />
          {!existingTeam && (
            <CustomText
              variant="subtitle"
              text="If you want to change something, go back"
            />
          )}
        </Div>
        <Div px="xl" py="lg">
          <Div pb="lg" justifyContent="space-evenly" row>
            <TouchableOpacity
              disabled={!existingTeam ? true : false}
              onPress={() =>
                navigation.navigate(authRoutes.REGIONS, {isExistingTeam: true})
              }>
              <Div
                shadow={existingTeam ? 'lg' : 'sm'}
                shadowColor="white"
                w={150}
                alignItems="center"
                p={12}
                bg="pokemonLightBlue">
                <Text color="white">Region: </Text>
                <Text fontSize="xl" fontWeight="600" pt="md" color="white">
                  {teamDetailsAccessKey.region.name}
                </Text>
              </Div>
            </TouchableOpacity>

            <Div px="md" />

            <TouchableOpacity
              disabled={!existingTeam ? true : false}
              onPress={() =>
                navigation.navigate(authRoutes.POKEDEXS, {
                  regionId: teamDetailsAccessKey.pokeDex.id,
                })
              }>
              <Div
                shadow={existingTeam ? 'lg' : 'sm'}
                shadowColor="white"
                w={150}
                alignItems="center"
                p={12}
                bg="pokemonLightBlue">
                <Text color="white">Pokedex: </Text>
                <Text fontSize="xl" fontWeight="600" pt="md" color="white">
                  {teamDetailsAccessKey.pokeDex.name}
                </Text>
              </Div>
            </TouchableOpacity>
          </Div>

          <Div pt="lg" alignItems="center">
            <CustomText
              variant="subtitle"
              text={`${teamDetailsAccessKey?.pokemons?.length ?? 0} Pokemons`}
            />
          </Div>
          <ScrollView horizontal>
            {teamDetailsAccessKey?.pokemons?.length > 0 &&
              teamDetailsAccessKey.pokemons.map((p: any) => {
                return (
                  <Div px="lg" key={`${p?.entry_number ?? ''}`}>
                    <PokemonCard
                      id={p.id}
                      name={p?.pokemon_species.name}
                      onPress={() => null}
                      fetchPokemonTypes
                      isSelected
                    />
                  </Div>
                );
              })}
          </ScrollView>
          <Icon
            name={'arrow-left-right'}
            color={'white'}
            fontFamily={'MaterialCommunityIcons'}
            fontSize={20}
          />
          {existingTeam && (
            <Div pt="sm" alignItems="center">
              <FilledButton
                onPress={() =>
                  navigation.navigate(authRoutes.POKEMONS, {
                    pokedexId: teamDetailsAccessKey.pokeDex.id,
                    selectedPokemons: teamDetailsAccessKey.pokemons,
                  })
                }
                text={'Edit Pokemons'}
                fontSize="lg"
              />
            </Div>
          )}

          <Div pt="2xl" pb="md" alignItems="center">
            <CustomText
              variant="subtitle"
              text={'Enter a name for your team (min 5 chars)'}
            />
          </Div>

          <CustomInput
            placeholder="My Team"
            onChange={setTeamName}
            value={teamName}
          />

          <Div py="xl" alignItems="center">
            <FilledButton
              isDisabled={teamName?.length < 5}
              onPress={handleSaveTeam}
              text={existingTeam ? 'Edit Team' : 'Save Team'}
              fontSize="lg"
            />
          </Div>
        </Div>
      </ScrollView>
    </SafeContainer>
  );
}

// const [teamToDelete, setTeamToDelete] = React.useState(-1);

// const handleDeleteTeam = (id: number) => {
//   const filteredTeams = teams.filter(team => team.id !== id);
//   setTeamToDelete(-1);
//   setTeams(filteredTeams);
// };

// const _renderDeleteAlert = () => {
//   if (teamToDelete === -1) {
//     return null;
//   }

//   const _teamName = teams.find(team => team.id === teamToDelete)?.name ?? '';

//   return (
//     <CustomAlert
//       title={'Wait, this action is irrevesible!'}
//       text={`Are you sure you want to delete the team ${_teamName}?`}
//       onPress={() => handleDeleteTeam(teamToDelete)}
//       onCancel={() => setTeamToDelete(-1)}
//       isVisible
//     />
//   );
// };

// on render
// {_renderDeleteAlert()}
