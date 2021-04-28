import * as React from 'react';
import {TouchableOpacity} from 'react-native';

import {Div, Text, Image} from 'react-native-magnus';

interface RegionCardProps {
  image: string;
  name: string;
  url: string;
  onPress: () => void;
}

export default function RegionCard({
  url,
  image,
  name,
  onPress = () => console.log(url),
}: RegionCardProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Div
        justifyContent="center"
        alignItems="center"
        shadow="lg"
        shadowColor="white"
        p="lg">
        <Text fontWeight="600" color="white" fontSize="lg" textAlign="center">
          {name}
        </Text>

        <Div pb="xs" />

        <Image
          h={100}
          w={100}
          source={{
            uri: image,
          }}
        />
      </Div>
    </TouchableOpacity>
  );
}
