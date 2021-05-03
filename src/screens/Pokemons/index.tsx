import * as React from 'react';

import {ScrollView, ActivityIndicator, FlatList} from 'react-native';
import {Div, Text, Icon} from 'react-native-magnus';

import PokemonCard from '../../components/PokemonCard';
import CustomText from '../../components/CustomText';

import api from '../../api';
import {useSharedState} from '../../store';

import SafeContainer from '../../components/SafeContainer';
import CustomAlert from '../../components/CustomAlert';
import FilledButton from '../../components/Button';

import {authRoutes} from '../../constants/navigation';

interface Pokemon {
  id: number;
  isSelected?: boolean;
  entry_number: number;
  pokemon_species: {
    name: string;
    url: string;
  };
}

export default function Pokemons({navigation, route}: any) {
  const alreadySelectedPokemons = route?.params?.selectedPokemons ?? [];

  const [, setState] = useSharedState();
  const [pokemons, setPokemons] = React.useState<Array<Pokemon>>([]);
  const [selectedPokemons, setSelectedPokemons] = React.useState<
    Array<Pokemon>
  >(alreadySelectedPokemons);

  const pokemonsCounter = selectedPokemons.length;

  const handlePokemonsCounterColor = () => {
    if (pokemonsCounter > 6 || pokemonsCounter < 3) {
      return 'red400';
    }

    return 'green300';
  };

  const pokemonColor = handlePokemonsCounterColor();
  const isSaveButtonShown = pokemonColor === 'green300' ? true : false;

  const [isFetchError, setIsFetchError] = React.useState(false);
  const pokedexId = route.params.pokedexId;

  const handleGetPokemons = async () => {
    try {
      const response = await api({
        path: `/pokedex/${pokedexId}`,
        method: 'GET',
      });

      if (response.error) {
        return setIsFetchError(true);
      }

      const formatedPokemons = response.pokemon_entries.map((p: Pokemon) => {
        const pokemonId = p.pokemon_species.url
          .replace('https://pokeapi.co/api/v2/pokemon-species/', '')
          .slice(0, -1);

        return {
          ...p,
          isSelected: false,
          id: pokemonId,
        };
      });

      setPokemons(formatedPokemons);
      setIsFetchError(false);
    } catch {
      setPokemons([]);
      setIsFetchError(true);
    }
  };

  const _renderErrorAlert = () => {
    if (!isFetchError) {
      return null;
    }

    return (
      <CustomAlert
        title={'There was an error getting the data'}
        text={'Do you want to try again'}
        onPress={() => handleGetPokemons()}
        onCancel={() => navigation.goBack()}
        isVisible
      />
    );
  };

  const handleSavePokemons = () => {
    const formatedSelectedPokemons = selectedPokemons.map(p => ({
      id: p.id,
      entry_number: p.entry_number,
      pokemon_species: {
        name: p.pokemon_species.name,
        url: p.pokemon_species.url,
      },
    }));

    setState(prev => ({...prev, pokemons: [...formatedSelectedPokemons]}));
    navigation.push(authRoutes.TEAM_DETAILS, {team: null});
  };

  const handleAddPokemon = (pokemonToAdd: Pokemon) => {
    setSelectedPokemons([pokemonToAdd, ...selectedPokemons]);
  };

  const handleRemovePokemon = (pokemonToRemove: Pokemon) => {
    const filteredPokemons = selectedPokemons.filter(
      p => p.entry_number !== pokemonToRemove.entry_number,
    );

    setSelectedPokemons(filteredPokemons);
  };

  const _handleRenderItem = ({item}: {item: Pokemon}) => {
    const isSelected = selectedPokemons.some(
      p => p.entry_number === item.entry_number,
    );

    return (
      <>
        <PokemonCard
          key={`${item.entry_number}`}
          id={item.id}
          name={item.pokemon_species.name}
          onPress={() => handleAddPokemon(item)}
          isSelected={isSelected}
        />

        <Div px="md" />
      </>
    );
  };

  React.useEffect(() => {
    handleGetPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeContainer>
      {_renderErrorAlert()}

      <Div alignItems="center" px="xl" pt="lg">
        <Div
          pb={isSaveButtonShown ? 'md' : 0}
          alignItems="center"
          justifyContent="space-between"
          row>
          <CustomText variant="subtitle" text="Select your Pokemons - " />
          <Text
            fontWeight="500"
            fontStyle="italic"
            color={handlePokemonsCounterColor()}>
            {pokemonsCounter}/6
          </Text>

          {isSaveButtonShown && (
            <>
              <Div px="md" />

              <FilledButton
                onPress={handleSavePokemons}
                text="Save Team"
                fontSize="xs"
              />
            </>
          )}
        </Div>

        {selectedPokemons.length > 0 && (
          <>
            <ScrollView horizontal>
              {selectedPokemons.map(p => {
                return (
                  <Div px="sm" key={`${p.entry_number}`}>
                    <PokemonCard
                      type="minicard"
                      id={p.id}
                      name={p.pokemon_species.name}
                      onPress={() => handleRemovePokemon(p)}
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
          </>
        )}
      </Div>

      {pokemons.length > 0 ? (
        <Div pt="lg" alignItems="center" flex={1}>
          <FlatList
            data={pokemons}
            numColumns={3}
            keyExtractor={item => item.entry_number.toString()}
            renderItem={_handleRenderItem}
          />
        </Div>
      ) : (
        <Div pt="3xl">
          <ActivityIndicator size="large" />
        </Div>
      )}
    </SafeContainer>
  );
}
