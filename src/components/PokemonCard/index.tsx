import * as React from 'react';
import {TouchableOpacity} from 'react-native';

import api from '../../api';

import {Div, Text, Icon} from 'react-native-magnus';
import {
  CardContainer,
  MiniCardContainer,
  CardNameText,
  MiniCardNameText,
  CardImage,
} from './elements';

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
          <CardContainer
            isSelected={isSelected}
            fetchPokemonTypes={fetchPokemonTypes}>
            <Text pb="xs" fontWeight="300" color="gray400" fontSize="md">
              #{id}
            </Text>

            <CardNameText>{name}</CardNameText>

            <Div pb="xs" />

            <CardImage srcId={id} />

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
          </CardContainer>
        </TouchableOpacity>
      ) : (
        <MiniCardContainer>
          <Div row>
            <MiniCardNameText>{name}</MiniCardNameText>

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

          <CardImage smallImg srcId={id} />

          <Text pt="sm" fontWeight="300" color="gray400" fontSize="sm">
            #{id}
          </Text>
        </MiniCardContainer>
      )}
    </>
  );
}
