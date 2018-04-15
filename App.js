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

import { Container, Button, Text } from 'native-base';

import Entry from './src/Components/Entry.js';

import MapView, { Marker } from 'react-native-maps';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

let id = 0;

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      clicked : false,
      text : null,
      latitude : null,
      longitude : null,
      markers : [],
    };
    this.clicked = this.clicked.bind(this);
    this.onMapPress = this.onMapPress.bind(this);
  }

  clicked(result) {
    this.setState({
      clicked : true,
      text : result.text,
      longitude : result.longitude,
      latitude : result.latitude,
    });
  }

  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: '#AAAAAA',
        },
      ],
    });
  }

  render() {
    return (
        this.state.clicked ?
          <View style={styles.container}>
            <MapView style={styles.container}
              initialRegion={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onPress={(e) => this.onMapPress(e)}
            >
              {this.state.markers.map(marker => (
                <Marker
                  key={marker.key}
                  coordinate={marker.coordinate}
                  pinColor={marker.pinColor}
                />))}
            </MapView>

            <Text style={styles.welcome}> {this.state.text} </Text>
          </View>
        :
          <Entry clicked={this.clicked}/>
    );
  }
}

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
