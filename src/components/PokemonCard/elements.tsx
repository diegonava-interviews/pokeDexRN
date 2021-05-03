import * as React from 'react';
import {Div, Text, Image} from 'react-native-magnus';
//TODO: Fix type of image

import defaultImg from './default.jpg';

export function CardImage({
  srcId,
  smallImg,
}: {
  srcId: number;
  smallImg?: boolean;
}) {
  return (
    <Image
      w={smallImg ? 50 : 100}
      h={smallImg ? 40 : 100}
      source={{
        uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${srcId}.png`,
      }}
      defaultSource={defaultImg}
    />
  );
}

export function CardContainer({
  isSelected,
  fetchPokemonTypes,
  children,
}: {
  isSelected: boolean;
  fetchPokemonTypes: Boolean;
  children: React.ReactNode;
}) {
  return (
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
      {children}
    </Div>
  );
}

export function CardNameText({children}: {children: React.ReactNode}) {
  return (
    <Text fontWeight="600" color="white" fontSize="lg" textAlign="center">
      {children}
    </Text>
  );
}

export function MiniCardContainer({children}: {children: React.ReactNode}) {
  return (
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
      {children}
    </Div>
  );
}

export function MiniCardNameText({children}: {children: React.ReactNode}) {
  return (
    <Text
      pr="xs"
      fontWeight="600"
      color="white"
      fontSize="lg"
      textAlign="center">
      {children}
    </Text>
  );
}
