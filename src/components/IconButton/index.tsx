import * as React from 'react';
import {Div, Icon} from 'react-native-magnus';
import {iconFontFamilyType} from 'react-native-magnus/lib/typescript/src/ui/icon/icon.type';
import {TouchableOpacity} from 'react-native';

interface IconButtonProps {
  iconName: string;
  iconFamily: iconFontFamilyType;
  iconColor?: string;
  circlePadding?: number;
  bgColor?: string;
  borderColor?: string;
  showBorder?: boolean;
  iconSize?: number | string;
  isDisabled?: boolean;
  blockPress?: boolean;
  onPress: () => void;
}

export default function IconButton({
  iconName,
  showBorder = false,
  iconFamily,
  bgColor = 'white',
  iconColor = 'black',
  borderColor = 'black',
  circlePadding = 10,
  iconSize = 20,
  isDisabled = false,
  blockPress = false,
  onPress,
}: IconButtonProps) {
  return (
    <TouchableOpacity disabled={blockPress} onPress={() => onPress()}>
      <Div
        borderWidth={showBorder ? 1 : 0}
        rounded="circle"
        bg={bgColor}
        borderColor={borderColor}
        p={circlePadding}>
        <Icon
          name={iconName}
          color={isDisabled ? 'gray200' : iconColor}
          fontFamily={iconFamily}
          fontSize={iconSize}
        />
      </Div>
    </TouchableOpacity>
  );
}
