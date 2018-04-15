import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Dimensions
} from 'react-native';

import { Container, Text, Button, Input, Item } from 'native-base';

export default class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text : null,
    }
    this.submit = this.submit.bind(this);
  }

  submit = () => {
    var text = this.state.text;
    fetch('/api/places', {
      method: 'POST',
      body : JSON.stringify({ location : text }),
      headers : new Headers({
        'Content-Type' : 'application/json'
      })
    }).then(result => {
      this.props.clicked({ text : text, latitude : result.latitude, longitude : result.longitude });
    })
    .catch(error => {
      // Add a popup that says that the search failed
    });

  }

  render() {
    return (
      <Container style={styles.container}>
        <Image style={styles.imageStyle} source={require('../../assets/party.jpg')}/>
        <Text style={styles.welcome}>
          Welcome to NightOut
        </Text>
        <Item regular>
          <Input
            onChangeText={((text) => this.setState({ text : text }))}
            placeholder='Where do you want to go tonight?' />
        </Item>
        <Button onPress={this.submit}>
          <Text> Submit </Text>
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
