import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import SwipeView from './app/components/SwipeView';
import SettingsView from './app/components/SettingsView';
import DetailView from './app/components/DetailsView';

const GiphySwipe = StackNavigator({
  Home: { screen: SwipeView },
  Settings: { screen: SettingsView },
  Details: { screen: DetailView }
});


AppRegistry.registerComponent('giphySwipe', () => GiphySwipe);
