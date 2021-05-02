import {useState} from 'react';
import {createContainer} from 'react-tracked';
import {initialState} from './models';

const useMyState = () => useState(initialState);

export const {
  Provider: SharedStateProvider,
  useTracked: useSharedState,
} = createContainer(useMyState);
