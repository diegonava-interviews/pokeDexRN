import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import defaultImg from './default.jpg';

import api from '../../api';

import {Div, Text, Image, Icon} from 'react-native-magnus';

interface PokemonCardProps {
  name: string;
  id: number;
  url?: string;
  onPress: () => void;
  type?: 'card' | 'minicard';
  isSelected?: boolean;
  fetchPokemonTypes?: boolean;
}

interface Types {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export default function PokemonCard({
  id,
  fetchPokemonTypes = false,
  name,
  onPress,
  type = 'card',
  isSelected = false,
}: PokemonCardProps) {
  const [pokemonTypes, setPokemonTypes] = React.useState<Array<Types>>([]);

  const handleGetPokemonTypes = async () => {
    try {
      const response = await api({
        path: `pokemon/${id}`,
        method: 'GET',
      });

      if (response.error) {
        throw Error;
      }

      setPokemonTypes(response.types);
    } catch {
      setPokemonTypes([]);
    }
  };

  React.useEffect(() => {
    if (!fetchPokemonTypes) {
      return;
    }

    handleGetPokemonTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            h={fetchPokemonTypes ? 270 : 'auto'}
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

            {fetchPokemonTypes &&
              pokemonTypes.length > 0 &&
              pokemonTypes.map(pokemonType => (
                <Text
                  key={pokemonType.slot}
                  pb="xs"
                  fontWeight="300"
                  color="gray400"
                  fontSize="md">
                  {pokemonType.type.name}
                </Text>
              ))}
          </Div>
        </TouchableOpacity>
      ) : (
        <Div
          justifyContent="center"
          alignItems="center"
          bg={'pokemonLightBlue'}
          w={130}
          py="sm"
          rounded="sm"
          shadow="md"
          shadowColor="white"
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
