import React, { Component } from 'react';

import { Container, Text, Button, Input, Item } from 'native-base';

import {
  Platform,
  StyleSheet,
  View,
  Image,
  Dimensions
} from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    state = {
      username : null,
      password : null,
      register : false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    fetch('https://vast-fortress-13759.herokuapp.com/api/login', {
      method : 'POST',
      body : JSON.stringify({ username : this.state.username,
                              password : this.state.password}),


    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.loginBox}>
        
          <Item rounded style={styles.username}>
            <Input onChangeText={((text) => this.setState({ text : text }))}
            placeholder='Username'/>
          </Item>
          <Item rounded style={styles.password}>
            <Input onChangeText={((text) => this.setState({ text : text }))}
            placeholder='Password'/>
          </Item>
          <Button bordered warning style={styles.button} onPress={() => this.onClick()}>
            <Text> Submit </Text>
          </Button>

        </View>
        <Text> {this.state.register ? "" : "Don't have an account? Sign up."} </Text>
        <Button onPress={() => {this.state.register = !this.state.register;}}>
          <Text> { this.state.register ? "Back to Login" : "Register" } </Text>
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : '#f9f9f9',
  },
  loginBox : {
    alignSelf : 'center',
    backgroundColor : '#f9f9f9',
    justifyContent : 'space-between',
    margin : 10,
    borderRadius : 30,
    top : 150,
    maxWidth : 400,
    maxHeight : 400,
  },
  username : {
    alignSelf : 'center',
    width : 300,
    margin : 30,
  },
  password : {
    alignSelf : 'center',
    margin : 30,
    width : 300,
  },
  button : {
    alignSelf : 'center',
    margin : 30,
  }
});
