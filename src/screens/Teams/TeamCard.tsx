import * as React from 'react';
import {TouchableOpacity} from 'react-native';

import {Div, Text, Icon} from 'react-native-magnus';

interface TeamCardProps {
  key: string;
  id: number;
  region: string;
  name: string;
  pokemonsCount: number;
  onPressCard: () => void;
  onPressEdit: () => void;
  onPressDelete: () => void;
}

export default function TeamCard({
  id,
  name,
  region,
  onPressCard,
  onPressEdit,
  onPressDelete,
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
        p="lg">
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

        <Div py="xs" />

        <Text pl="xs" fontWeight="500" color="gray400" fontSize="md">
          {pokemonsCount} Pokemons
        </Text>

        <Div pt="xl" justifyContent="space-between" row>
          <TouchableOpacity onPress={onPressEdit}>
            <Div p="lg" bg="pokemonDarkBlue">
              <Text color="white">Edit</Text>
            </Div>
          </TouchableOpacity>

          <Div px="sm" />

          <TouchableOpacity onPress={onPressDelete}>
            <Div p="lg" bg="gray500">
              <Text>Delete</Text>
            </Div>
          </TouchableOpacity>
        </Div>
      </Div>

      <Div py="md" />
    </TouchableOpacity>
  );
}
