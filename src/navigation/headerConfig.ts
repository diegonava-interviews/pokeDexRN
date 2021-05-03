import theme from '../theme';

export default {
  headerRight: () => null,
  headerTitleStyle: {
    color: theme.colors.pokemonYellow,
    fontSize: 24,
  },
  headerBackTitleVisible: false,
  headerTintColor: 'lightgray',
  headerStyle: {
    backgroundColor: theme.colors.pokemonDarkBlue,
    shadowOffset: {height: 0, width: 0},
  },
};
