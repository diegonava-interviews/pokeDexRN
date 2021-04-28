import * as React from 'react';
import auth from '@react-native-firebase/auth';

import {SafeAreaView, ScrollView} from 'react-native';
import {Div, Text} from 'react-native-magnus';

import FilledButton from '../../components/Button';
import RegionCard from './RegionCard';

export default function Regions() {
  const handleLogout = async () => {
    auth().signOut();
  };

  const regions = [
    {
      name: 'kanto',
      url: 'https://pokeapi.co/api/v2/region/1/',
      image:
        'https://static.wikia.nocookie.net/espokemon/images/c/c6/Kanto_mapa_juegos.png/revision/latest/scale-to-width-down/384?cb=20090925155859',
    },
    {
      name: 'johto',
      url: 'https://pokeapi.co/api/v2/region/2/',
      image:
        'https://static.wikia.nocookie.net/espokemon/images/4/43/Johto_mapa_juegos.png/revision/latest?cb=20090920215330',
    },
    {
      name: 'hoenn',
      url: 'https://pokeapi.co/api/v2/region/3/',
      image:
        'https://static.wikia.nocookie.net/espokemon/images/1/1c/Mapa_Hoenn_juegos.png/revision/latest/scale-to-width-down/640?cb=20141212181244',
    },
    {
      name: 'sinnoh',
      url: 'https://pokeapi.co/api/v2/region/4/',
      image:
        'https://static.wikia.nocookie.net/espokemon/images/0/03/Sinnoh_mapa_juegos.png/revision/latest/scale-to-width-down/530?cb=20090102010146',
    },
    {
      name: 'unova',
      url: 'https://pokeapi.co/api/v2/region/5/',
      image:
        'https://static.wikia.nocookie.net/espokemon/images/d/dd/Teselia2_mapa_juegos.png/revision/latest/scale-to-width-down/512?cb=20120710141029',
    },
    {
      name: 'kalos',
      url: 'https://pokeapi.co/api/v2/region/6/',
      image:
        'https://static.wikia.nocookie.net/espokemon/images/8/8d/Mapa_Kalos_juegos.png/revision/latest/scale-to-width-down/640?cb=20131018190652',
    },
    {
      name: 'alola',
      url: 'https://pokeapi.co/api/v2/region/7/',
      image:
        'https://static.wikia.nocookie.net/espokemon/images/6/65/Mapa_Alola_SL.png/revision/latest/scale-to-width-down/700?cb=20170325170058',
    },
    {
      name: 'galar',
      url: 'https://pokeapi.co/api/v2/region/8/',
      image:
        'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/e/ef/latest/20191117110252/Mapa_Galar_EpEc.png/233px-Mapa_Galar_EpEc.png',
    },
  ];

  const _renderRegionCards = () => {
    return regions.map((region, index) => {
      const properCaseName = `${region.name[0].toUpperCase()}${region.name.slice(
        1,
      )}`;

      return (
        <RegionCard
          key={`${region.name}${index}`}
          name={properCaseName}
          image={region.image}
          url={region.url}
        />
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#003A70'}}>
      <ScrollView>
        <Div px="xl" py="lg">
          <Text
            color="pokemonYellow"
            fontSize="3xl"
            fontWeight="bold"
            textAlign="center">
            Pokemon Regions
          </Text>
          <Text
            color="pokemonYellow"
            fontSize="md"
            fontWeight="500"
            textAlign="center"
            fontStyle="italic">
            Select a region
          </Text>

          <Div row flexWrap="wrap" pt="lg" justifyContent="space-around">
            {_renderRegionCards()}
          </Div>

          <Div py="2xl" alignItems="center">
            <FilledButton onPress={handleLogout} text="Logout" fontSize="lg" />
          </Div>
        </Div>
      </ScrollView>
    </SafeAreaView>
  );
}
