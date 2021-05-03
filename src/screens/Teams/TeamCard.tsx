import * as React from 'react';
import {TouchableOpacity} from 'react-native';

import {Div, Text, Icon} from 'react-native-magnus';

interface TeamCardProps {
  key: string;
  id: number;
  region: string;
  pokeDex: string;
  name: string;
  pokemonsCount: number;
  onPressCard: () => void;
}

export default function TeamCard({
  id,
  name,
  region,
  pokeDex,
  onPressCard,
  pokemonsCount,
}: TeamCardProps) {
  return (
    <TouchableOpacity onPress={onPressCard}>
      <Div
        rounded="lg"
        justifyContent="center"
        alignItems="center"
        shadow="lg"
        shadowColor="white"
        bg="pokemonLightBlue"
        w={150}
        p="lg"
        my="xs">
        <Text pb="xs" fontWeight="300" color="gray400" fontSize="md">
          #{id}
        </Text>

        <Text fontWeight="600" color="white" fontSize="lg">
          {name}
        </Text>

        <Div py="xs" />

        <Icon
          name={'users'}
          color={'white'}
          fontFamily={'FontAwesome5'}
          fontSize={32}
        />

        <Div py="xs" />

        <Div justifyContent="center" alignItems="center" pt="sm" row>
          <Icon
            name={'map-pin'}
            color={'white'}
            fontFamily={'Feather'}
            fontSize="lg"
          />

          <Text pl="xs" fontWeight="500" color="gray400" fontSize="md">
            {region}
          </Text>
        </Div>

        <Div py="md" />

        <Text pl="xs" fontWeight="700" color="gray400" fontSize="md">
          Deck:
        </Text>

        <Text pl="xs" fontWeight="500" color="gray400" fontSize="md">
          {pokeDex}
        </Text>

        <Div py="md" />

        <Text pl="xs" fontWeight="500" color="gray400" fontSize="md">
          {pokemonsCount} Pokemons
        </Text>
      </Div>

      <Div py="md" />
    </TouchableOpacity>
  );
}
