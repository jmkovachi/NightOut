import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Dimensions
} from 'react-native';

import { Container, Text, Button } from 'native-base';

export default class Entry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Image style={styles.imageStyle} source={require('../../assets/party.jpg')}/>
        <Text style={styles.welcome}>
          Welcome to NightOut
        </Text>
        <Button onPress={this.props.clicked}>
          <Text style={styles.instructions}>
            Get started
          </Text>
        </Button>
      </Container>
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
