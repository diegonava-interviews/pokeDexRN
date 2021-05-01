import * as React from 'react';
import {TouchableOpacity} from 'react-native';

import {Div, Text, Icon} from 'react-native-magnus';

interface RegionCardProps {
  name: string;
  onPress: () => void;
}

export default function RegionCard({name, onPress}: RegionCardProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Div
        justifyContent="center"
        alignItems="center"
        shadow="lg"
        shadowColor="white"
        bg="pokemonLightBlue"
        w={150}
        rounded="lg"
        py="lg"
        my="lg">
        <Text fontWeight="600" color="white" fontSize="lg" textAlign="center">
          {name}
        </Text>

        <Div pb="xs" />

        <Icon
          name={'map-pin'}
          color={'white'}
          fontFamily={'Feather'}
          fontSize="3xl"
        />
      </Div>
    </TouchableOpacity>
  );
}
