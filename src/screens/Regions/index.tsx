import * as React from 'react';

import {ScrollView, ActivityIndicator} from 'react-native';
import {Div} from 'react-native-magnus';

import api from '../../api';
import {useSharedState} from '../../store';

import RegionCard from './RegionCard';
import CustomText from '../../components/CustomText';
import CustomAlert from '../../components/CustomAlert';
import SafeContainer from '../../components/SafeContainer';

import {authRoutes} from '../../constants/navigation';

interface Region {
  name: string;
  url: string;
}

export default function Regions({navigation}: any) {
  const [, setState] = useSharedState();

  const [regions, setRegions] = React.useState<Array<Region>>([]);

  const [isFetchError, setIsFetchError] = React.useState(false);

  const handleGetRegions = async () => {
    try {
      const response = await api({
        path: 'region',
        method: 'GET',
      });

      if (response.error) {
        return setIsFetchError(true);
      }

      setRegions(response.results);
      setIsFetchError(false);
    } catch {
      setRegions([]);
      setIsFetchError(true);
    }
  };

  const _renderErrorAlert = () => {
    if (!isFetchError) {
      return null;
    }

    return (
      <CustomAlert
        title={'There was an error getting the data'}
        text={'Do you want to try again'}
        onPress={() => handleGetRegions()}
        onCancel={() => navigation.goBack()}
        isVisible
      />
    );
  };

  const handleSelectRegion = (region: Region) => {
    const regionPath = region.url.replace('https://pokeapi.co/api/v2/', '');

    setState(prev => ({
      ...prev,
      region: {
        name: region.name,
        id: parseInt(regionPath, 10),
      },
    }));

    navigation.navigate(authRoutes.POKEDEXS, {regionPath});
  };

  const _renderRegionCards = () => {
    return regions.map((region, index) => {
      return (
        <RegionCard
          key={`${region.name}${index}`}
          name={region.name}
          onPress={() => handleSelectRegion(region)}
        />
      );
    });
  };

  React.useEffect(() => {
    handleGetRegions();
  }, []);

  return (
    <SafeContainer>
      {_renderErrorAlert()}
      <ScrollView>
        <Div alignItems="center" px="xl" py="lg">
          <CustomText variant="subtitle" text="Select a Region" />

          {regions.length > 0 ? (
            <Div row flexWrap="wrap" pt="lg" justifyContent="space-around">
              {_renderRegionCards()}
            </Div>
          ) : (
            <Div pt="3xl">
              <ActivityIndicator size="large" />
            </Div>
          )}
        </Div>
      </ScrollView>
    </SafeContainer>
  );
}
