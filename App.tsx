import React from 'react';
import 'react-native-gesture-handler';
import {ThemeProvider} from 'react-native-magnus';

import Navigation from './src/navigation';
import theme from './src/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
    </ThemeProvider>
  );
}

export default App;
