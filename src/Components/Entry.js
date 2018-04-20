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
    };
    this.submit = this.submit.bind(this);
  }

  submit() {
    var text = this.state.text;
    console.log('hi');
    //fetch('https://vast-fortress-13759.herokuapp.com/api/places', {
    fetch('http://127.0.0.1:4000/api/places', {
      method: 'POST',
      body : JSON.stringify({ location : text }),
      headers : new Headers({
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
      })
    })
    .then(result => {
      return result.json();
    })
    .then(result => {
      console.log(result);

      this.props.navigation.navigate(
        'MapScreen',
        {
          text : text,
          latitude : Number(result.location.lat),
          longitude : Number(result.location.lng),
          markers : result.markers,
        },
      );
    })
    .catch(error => {
      console.log(error);
      // Add a popup that says that the search failed
    });

  }

  render() {
    return (
      <Container style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to NightOut
        </Text>
        <Item rounded style={styles.textbox}>
          <Input
            onChangeText={((text) => this.setState({ text : text }))}
            placeholder='Where do you want to go tonight?' />
        </Item>
        <Button bordered warning onPress={this.submit} style={styles.Button}>
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
    justifyContent: 'center',
    backgroundColor : '#f9f9f9',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
  Button: {
    alignSelf: 'center',
    margin : 20,
  },
  textbox :{
    margin : 20,
  },
  imageStyle: {
    position : 'absolute',
    width : Dimensions.get('window').width,
    height : Dimensions.get('window').height,
  }
});
