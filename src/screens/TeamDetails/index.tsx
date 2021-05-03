import * as React from 'react';

import {ScrollView} from 'react-native';
import {Div, Icon, Text} from 'react-native-magnus';

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

  // console.log('%c⧭ state', 'color: #ff6600', state);
  // console.log('%c⧭existingTeam', 'color: #00736b', existingTeam);

  const initialTeamName = existingTeam ? existingTeam.name : '';
  const [teamName, setTeamName] = React.useState(initialTeamName);

  const teamDetailsAccessKey = existingTeam ? existingTeam : state;

  const handleSaveTeam = () => {
    // console.log('handleaSaveTeam: ', 'teamName');
    navigation.replace(authRoutes.TEAMS);
  };

  return (
    <SafeContainer>
      <ScrollView>
        <Div pb="md" alignItems="center">
          <CustomText
            variant="subtitle"
            text="This is the overview of your selections"
          />
          <CustomText
            variant="subtitle"
            text="If you want to change something, go back"
          />
        </Div>
        <Div px="xl" py="lg">
          <Div pb="lg" justifyContent="space-evenly" row>
            <Div w={150} alignItems="center" p={12} bg="pokemonLightBlue">
              <Text color="white">Region: </Text>
              <Text fontSize="xl" fontWeight="600" pt="md" color="white">
                {teamDetailsAccessKey.region.name}
              </Text>
            </Div>

            <Div px="md" />

            <Div w={150} alignItems="center" p={12} bg="pokemonLightBlue">
              <Text color="white">Pokedex: </Text>
              <Text fontSize="xl" fontWeight="600" pt="md" color="white">
                {teamDetailsAccessKey.pokeDex.name}
              </Text>
            </Div>
          </Div>

          <Div pt="lg" alignItems="center">
            <CustomText
              variant="subtitle"
              text={`${teamDetailsAccessKey.pokemons.length} Pokemons`}
            />
          </Div>
          <ScrollView horizontal>
            {teamDetailsAccessKey.pokemons.map((p: any) => {
              return (
                <Div px="lg" key={`${p?.entry_number ?? ''}`}>
                  <PokemonCard
                    id={p.id}
                    name={p?.pokemon_species.name}
                    onPress={() => console.log('')}
                    fetchPokemonTypes
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

          <Div pt="3xl" pb="md" alignItems="center">
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
