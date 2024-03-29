/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Dimensions
} from 'react-native';

import { Provider } from 'react-redux';

import store from './src/Store/store';

import { Container, Button, Text, Item, Input } from 'native-base';

import Map from './src/Components/Map.js';
import Entry from './src/Components/Entry.js';
import Login from './src/Components/Login.js';
import { StackNavigator } from 'react-navigation';

const APP_ENV = 'development';

console.disableYellowBox = true;

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      clicked : false,
      text : null,
      latitude : null,
      longitude : null,
    };
    this.clicked = this.clicked.bind(this);
  }

  clicked(result) {
    this.setState({
      clicked : true,
      text : result.text,
      longitude : result.longitude,
      latitude : result.latitude,
    });
  }

  render() {
    return (
      <Provider store={store} >
        {
        APP_ENV !== 'development'
        ?
          <Login />
        :
          <RootStack />
        }
      </ Provider>
    );
  }
}


const RootStack = StackNavigator(
  {
    EntryScreen: {
      screen: Entry,
    },
    MapScreen: {
      screen: Map,
    },
  },
  {
    initialRouteName: 'EntryScreen',
    navigationOptions: {
      header : null,
    },
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width : Dimensions.get('window').width,
    height : Dimensions.get('window').height,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  imageStyle: {
    position : 'absolute',
    width : Dimensions.get('window').width,
    height : Dimensions.get('window').height,
  }
});
