import * as React from 'react';

import {SafeAreaView, StyleSheet} from 'react-native';
import theme from '../../theme';

//TODO: Types pending

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pokemonDarkBlue,
  },
});

export default function SafeAreaContainer({children}: any) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}
