import React from 'react';
import 'react-native-gesture-handler';
import {ThemeProvider} from 'react-native-magnus';

import Navigation from './src/navigation';
import {SharedStateProvider} from './src/store';
import theme from './src/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SharedStateProvider>
        <Navigation />
      </SharedStateProvider>
    </ThemeProvider>
  );
}

export default App;
