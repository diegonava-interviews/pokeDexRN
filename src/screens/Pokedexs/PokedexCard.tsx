import * as React from 'react';
import {TouchableOpacity} from 'react-native';

import {Div, Text, Icon} from 'react-native-magnus';

interface PokedexCardProps {
  name: string;
  onPress: () => void;
}

export default function PokedexCard({name, onPress}: PokedexCardProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Div
        justifyContent="center"
        alignItems="center"
        shadow="lg"
        shadowColor="white"
        bg="pokemonLightBlue"
        w={180}
        rounded="lg"
        py="lg"
        my="lg">
        <Text fontWeight="600" color="white" fontSize="lg" textAlign="center">
          {name}
        </Text>

        <Div pb="xs" />

        <Icon
          name={'cards-outline'}
          color={'white'}
          fontFamily={'MaterialCommunityIcons'}
          fontSize={40}
        />
      </Div>
    </TouchableOpacity>
  );
}
