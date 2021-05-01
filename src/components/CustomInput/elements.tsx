import React from 'react';
import { Text } from 'react-native-magnus';

export const TitleText = ({
  children,
  titleColor,
}: {
  children: any;
  titleColor: string;
}) => {
  return (
    <Text pl={4} fontSize='md' color={titleColor} fontWeight='700'>
      {children}
    </Text>
  );
};

export const ErrorText = ({ children }: any) => {
  return (
    <Text
      fontStyle='italic'
      pl={2}
      pt={4}
      fontWeight='600'
      fontSize='sm'
      color='red600'
    >
      {children}
    </Text>
  );
};
