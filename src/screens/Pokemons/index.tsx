import * as React from 'react';

import {
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Div, Text, Icon} from 'react-native-magnus';

import PokemonCard from './PokemonCard';
import CustomText from '../../components/CustomText';

import api from '../../api';
import CustomAlert from '../../components/CustomAlert';
import {authRoutes} from '../../constants/navigation';
import FilledButton from '../../components/Button';

interface Pokemon {
  isSelected?: boolean;
  entry_number: number;
  pokemon_species: {
    name: string;
    url: string;
  };
}

export default function Pokemons({navigation, route}: any) {
  const [pokemons, setPokemons] = React.useState<Array<Pokemon>>([]);

  const [selectedPokemons, setSelectedPokemons] = React.useState<
    Array<Pokemon>
  >([]);

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
  const pokemonsPath = route.params.pokemonsPath;

  const handleGetPokemons = async () => {
    try {
      const response = await api({
        path: pokemonsPath,
        method: 'GET',
      });

      if (response.error) {
        return setIsFetchError(true);
      }

      const formatedPokemons = response.pokemon_entries.map((p: Pokemon) => ({
        ...p,
        isSelected: false,
      }));

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

  const handleAddPokemon = (pokemonToAdd: Pokemon) => {
    // setPokemons([{...pokemonToAdd, isSelected: true}, ...pokemons]);
    setSelectedPokemons([pokemonToAdd, ...selectedPokemons]);
  };

  const handleRemovePokemon = (pokemonToRemove: Pokemon) => {
    const filteredPokemons = selectedPokemons.filter(
      p => p.entry_number !== pokemonToRemove.entry_number,
    );

    setSelectedPokemons(filteredPokemons);
  };

  const _handleRenderItem = ({item}: {item: Pokemon}) => {
    const pokemonId = item.pokemon_species.url
      .replace('https://pokeapi.co/api/v2/pokemon-species/', '')
      .slice(0, -1);

    const isSelected = selectedPokemons.some(
      p => p.entry_number === item.entry_number,
    );

    return (
      <>
        <PokemonCard
          key={`${item.entry_number}`}
          id={pokemonId}
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#003A70'}}>
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
                onPress={() => console.log('sads')}
                text="Save Team"
                fontSize="xs"
              />
            </>
          )}
        </Div>

        {selectedPokemons.length > 0 && (
          <>
            <ScrollView horizontal>
              {selectedPokemons.map(p => (
                <Div px="sm" key={`${p.entry_number}`}>
                  <PokemonCard
                    type="minicard"
                    id={p.entry_number.toString()}
                    name={p.pokemon_species.name}
                    onPress={() => handleRemovePokemon(p)}
                  />
                </Div>
              ))}
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
    </SafeAreaView>
  );
}
