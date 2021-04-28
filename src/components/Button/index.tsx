import React from 'react';
import {Button, Icon, Text, Div} from 'react-native-magnus';
import {iconFontFamilyType} from 'react-native-magnus/lib/typescript/src/ui/icon/icon.type';

interface Icon {
  size: string | number;
  color: string;
  name: string;
  fontFamily: iconFontFamilyType;
}

interface ButtonProps {
  text: string;
  onPress: () => void;
  textColor?: string;
  buttonColor?: string;
  width?: number | string;
  height?: number | string;
  isDisabled?: boolean;
  block?: boolean;
  fontSize?: string | number;
  icon?: Icon | null;
}

function FilledButton({
  text,
  onPress,
  textColor = 'white',
  buttonColor = 'pokemonLightBlue',
  height = 'auto',
  width = 'auto',
  isDisabled = false,
  block = false,
  fontSize = 'xl',
  icon = null,
}: ButtonProps) {
  return (
    <Div>
      <Button
        w={width}
        h={height}
        bg={buttonColor}
        rounded="2xl"
        block={block}
        onPress={() => onPress()}
        disabled={isDisabled}>
        <Div flexDir="row" justifyContent="center" alignItems="center">
          {icon !== null && (
            <Icon
              name={icon.name}
              color={icon.color}
              fontFamily={icon.fontFamily}
              fontSize={icon.size}
              pr={'md'}
            />
          )}

          <Text fontWeight="500" fontSize={fontSize} color={textColor}>
            {text}
          </Text>
        </Div>
      </Button>
    </Div>
  );
}

export default FilledButton;
