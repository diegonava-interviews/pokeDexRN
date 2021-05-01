import * as React from 'react';

import {SafeAreaView, ScrollView, ActivityIndicator} from 'react-native';
import {Div} from 'react-native-magnus';

import PokedexCard from './PokedexCard';
import CustomText from '../../components/CustomText';

import api from '../../api';
import CustomAlert from '../../components/CustomAlert';
import {authRoutes} from '../../constants/navigation';

export default function Pokedexs({navigation, route}: any) {
  console.log('%c⧭ route', 'color: #1d3f73', route);
  const [pokedexs, setPokedexs] = React.useState<
    Array<{name: string; url: string}>
  >([]);

  const [isFetchError, setIsFetchError] = React.useState(false);
  const regionPath = route.params.regionPath;

  const handleGetPokeDexs = async () => {
    try {
      const response = await api({
        path: regionPath,
        method: 'GET',
      });

      if (response.error) {
        return setIsFetchError(true);
      }

      setPokedexs(response.pokedexes);
      setIsFetchError(false);
    } catch {
      setPokedexs([]);
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
        onPress={() => handleGetPokeDexs()}
        onCancel={() => navigation.goBack()}
        isVisible
      />
    );
  };

  const handleSelectPokedex = (region: any) => {
    const pokemonsPath = region.url.replace('https://pokeapi.co/api/v2/', '');
    navigation.navigate(authRoutes.POKEMONS, {pokemonsPath});
  };

  const _renderPokedexCards = () => {
    return pokedexs.map((pokedex, index) => {
      return (
        <PokedexCard
          key={`${pokedex.name}${index}`}
          name={pokedex.name}
          onPress={() => handleSelectPokedex(pokedex)}
        />
      );
    });
  };

  React.useEffect(() => {
    handleGetPokeDexs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#003A70'}}>
      {_renderErrorAlert()}
      <ScrollView>
        <Div alignItems="center" px="xl" py="lg">
          <CustomText variant="subtitle" text="Select a Pokedex" />

          {pokedexs.length > 0 ? (
            <Div row flexWrap="wrap" pt="lg" justifyContent="space-around">
              {_renderPokedexCards()}
            </Div>
          ) : (
            <Div pt="3xl">
              <ActivityIndicator size="large" />
            </Div>
          )}
        </Div>
      </ScrollView>
    </SafeAreaView>
  );
}
