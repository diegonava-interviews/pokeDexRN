import IconButton from '../IconButton';
import React from 'react';
import {Modal as ModalRn} from 'react-native';

import {Div} from 'react-native-magnus';

interface ModalPropsType {
  isVisible: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

function Modal({isVisible, onRequestClose, children}: ModalPropsType) {
  return (
    <ModalRn
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => onRequestClose()}>
      <Div
        flex={1}
        justifyContent="center"
        alignItems="center"
        bg={'rgba(0, 0, 0, 0.5)'}>
        <Div top={50} left={125} position="relative" zIndex={1}>
          <IconButton
            iconName="close"
            iconColor="gray700"
            iconFamily="FontAwesome"
            iconSize="3xl"
            onPress={() => onRequestClose()}
          />
        </Div>
        {children}
      </Div>
    </ModalRn>
  );
}

export default Modal;
