import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import defaultImg from './default.jpg';

import {Div, Text, Image, Icon} from 'react-native-magnus';

interface PokemonCardProps {
  name: string;
  id: string;
  onPress: () => void;
  type?: 'card' | 'minicard';
  isSelected?: boolean;
}

export default function PokemonCard({
  id,
  name,
  onPress,
  type = 'card',
  isSelected = false,
}: PokemonCardProps) {
  return (
    <>
      {type === 'card' ? (
        <TouchableOpacity disabled={isSelected} onPress={onPress}>
          <Div
            justifyContent="center"
            alignItems="center"
            shadow="lg"
            shadowColor="white"
            bg={'pokemonLightBlue'}
            opacity={isSelected ? 0.3 : 1}
            w={100}
            rounded="lg"
            py="lg"
            my="lg">
            <Text pb="xs" fontWeight="300" color="gray400" fontSize="md">
              #{id}
            </Text>

            <Text
              fontWeight="600"
              color="white"
              fontSize="lg"
              textAlign="center">
              {name}
            </Text>

            <Div pb="xs" />

            <Image
              w={100}
              h={100}
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
              }}
              defaultSource={defaultImg}
            />
          </Div>
        </TouchableOpacity>
      ) : (
        <Div
          justifyContent="center"
          alignItems="center"
          bg={'pokemonLightBlue'}
          w={130}
          py="sm"
          my="lg">
          <Div row>
            <Text
              pr="xs"
              fontWeight="600"
              color="white"
              fontSize="lg"
              textAlign="center">
              {name}
            </Text>

            <TouchableOpacity onPress={onPress}>
              <Icon
                name={'close'}
                color={'white'}
                fontFamily={'MaterialCommunityIcons'}
                fontSize={20}
              />
            </TouchableOpacity>
          </Div>

          <Div py="xs" />

          <Image
            w={50}
            h={40}
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            }}
            defaultSource={defaultImg}
          />

          <Text pt="sm" fontWeight="300" color="gray400" fontSize="sm">
            #{id}
          </Text>
        </Div>
      )}
    </>
  );
}
