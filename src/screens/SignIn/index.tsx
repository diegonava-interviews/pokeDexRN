import * as React from 'react';

import {Div, Icon, Text} from 'react-native-magnus';
import FilledButton from '../../components/Button';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

//TODO: Config is exposed because this is a test project, I didn't want to invest the time configuring .env files to complete other things
GoogleSignin.configure({
  webClientId:
    '1017064912683-oclgj4quteqv2bs248gnjp2sceaok6ll.apps.googleusercontent.com',
});

export default function SignIn() {
  const handleGoogleLogin = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <Div
      bgImg={require('./signInBackground.png')}
      flex={1}
      alignItems="center"
      justifyContent="center">
      <Div p="lg" w="100%" bg="rgba(0,0,0,0.25)">
        <Text
          textAlign="center"
          color="pokemonYellow"
          fontSize="5xl"
          fontWeight="bold"
          my="md">
          PokeTeam
        </Text>
        <Icon
          name="pokeball"
          color="yellow300"
          fontSize="6xl"
          fontFamily="MaterialCommunityIcons"
        />
      </Div>

      <Div py="xl" />

      <FilledButton
        onPress={handleGoogleLogin}
        text="Sign with Google"
        fontSize="lg"
        icon={{
          name: 'google',
          color: 'white',
          fontFamily: 'AntDesign',
          size: 'xl',
        }}
      />
    </Div>
  );
}
