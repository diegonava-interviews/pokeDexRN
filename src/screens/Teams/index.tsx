import * as React from 'react';
import auth from '@react-native-firebase/auth';

import {SafeAreaView, ScrollView} from 'react-native';
import {Div, Text} from 'react-native-magnus';

import FilledButton from '../../components/Button';
import RegionCard from './RegionCard';

export default function Teams() {
  const handleLogout = async () => {
    auth().signOut();
  };

  const regions = [
    {
      name: 'Namek Team',
      region: 'Kanto',
      pokemons: [{}],
      description: '',
      owner: {
        name: '',
        emai: '',
        photo: '',
      },
    },
    {
      name: 'Pelu Team',
      region: 'Johto',
      pokemons: [{}],
      description: '',
      owner: {
        name: '',
        emai: '',
        photo: '',
      },
    },
    {
      name: 'Eldia Team',
      region: 'Hoenn',
      pokemons: [{}],
      description: '',
      owner: {
        name: '',
        emai: '',
        photo: '',
      },
    },
    {
      name: 'Saya Team',
      region: 'Sinnoh',
      pokemons: [{}],
      description: '',
      owner: {
        name: '',
        emai: '',
        photo: '',
      },
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
            Pokemon Teams
          </Text>
          <Text
            color="pokemonYellow"
            fontSize="md"
            fontWeight="500"
            textAlign="center"
            fontStyle="italic">
            Heeeey
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
