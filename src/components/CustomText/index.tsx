import React from 'react';

import {Text} from 'react-native-magnus';

interface CustomTextPropsType {
  text: string;
  variant: 'title' | 'subtitle';
}

export default function CustomText({text, variant}: CustomTextPropsType) {
  const handleSetVariantStyle = (variantName: string) => {
    switch (variantName) {
      case 'title':
        return {
          color: 'pokemonYellow',
          fontSize: '3xl',
          fontWeight: 'bold',
          fontStyle: 'normal',
        };
      case 'subtitle':
        return {
          color: 'pokemonYellow',
          fontSize: 'md',
          fontWeight: '500',
          fontStyle: 'italic',
        };
      default:
        return {
          color: 'black',
          fontSize: 'md',
          fontWeight: '500',
          fontStyle: 'normal',
        };
    }
  };

  const variantStyle = handleSetVariantStyle(variant);

  return (
    <Text
      fontStyle={variantStyle.fontStyle}
      color={variantStyle.color}
      fontSize={variantStyle.fontSize}
      fontWeight={variantStyle.fontWeight}>
      {text}
    </Text>
  );
}
