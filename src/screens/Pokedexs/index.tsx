import * as React from 'react';

import {ScrollView, ActivityIndicator} from 'react-native';
import {Div} from 'react-native-magnus';

import PokedexCard from './PokedexCard';
import CustomText from '../../components/CustomText';
import SafeContainer from '../../components/SafeContainer';
import CustomAlert from '../../components/CustomAlert';

import api from '../../api';
import {useSharedState} from '../../store';

import {authRoutes} from '../../constants/navigation';

interface PokeDex {
  name: string;
  url: string;
}

export default function Pokedexs({navigation, route}: any) {
  const [, setState] = useSharedState();

  const [pokedexs, setPokedexs] = React.useState<Array<PokeDex>>([]);

  const [isFetchError, setIsFetchError] = React.useState(false);
  const regionId = route.params.regionId;

  const handleGetPokeDexs = async () => {
    try {
      const response = await api({
        path: `region/${regionId}`,
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

  const handleSelectPokedex = (pokedex: PokeDex) => {
    const pokedexId = parseInt(
      pokedex.url.replace('https://pokeapi.co/api/v2/pokedex/', '').slice(0, 1),
      10,
    );

    setState(prev => ({
      ...prev,
      pokeDex: {
        name: pokedex.name,
        id: pokedexId,
      },
    }));

    navigation.navigate(authRoutes.POKEMONS, {pokedexId});
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
    <SafeContainer>
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
    </SafeContainer>
  );
}
