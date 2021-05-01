import React from 'react';
import {Input} from 'react-native-magnus';

import {TitleText, ErrorText} from './elements';

interface CustomInputProps {
  title?: string;
  titleColor?: string;
  placeholder: string;
  errorMessage?: string;
  onChange: (val: string) => void;
  value: string;
  isDisabled?: boolean;
}

function CustomInput({
  title = '',
  titleColor = 'white',
  placeholder,
  errorMessage = '',
  onChange,
  value,
  isDisabled = false,
}: CustomInputProps) {
  const isError = errorMessage.length > 0;

  return (
    <>
      {title.length > 0 && (
        <TitleText titleColor={titleColor}>{title}</TitleText>
      )}
      <Input
        mt={6}
        bg={isDisabled ? 'gray200' : 'white'}
        placeholder={placeholder}
        borderColor={isError ? 'red600' : 'gray400'}
        focusBorderColor={isError ? 'red600' : 'gray600'}
        value={value}
        onChangeText={onChange}
        rounded="xl"
        editable={!isDisabled}
      />
      {isError && <ErrorText>{errorMessage}</ErrorText>}
    </>
  );
}

export default CustomInput;
