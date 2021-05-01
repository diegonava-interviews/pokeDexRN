import * as React from 'react';
import {Alert} from 'react-native';

interface AlertProps {
  title: string;
  text: string;
  isVisible: boolean;
  onPress: () => void;
  onCancel: () => void;
}

function CustomAlert({
  title,
  text,
  onPress,
  onCancel,
  isVisible = false,
}: AlertProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <>
      {Alert.alert(title, `\n${text}`, [
        {
          text: 'Cancel',
          onPress: () => onCancel(),
        },
        {
          text: 'Ok',
          onPress: () => onPress(),
        },
      ])}
    </>
  );
}

export default CustomAlert;
