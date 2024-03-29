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
    this.state = {
      username : '',
      password : '',
      email : '',
      register : false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.state.register) {
      fetch('https://vast-fortress-13759.herokuapp.com/api/register', {
        method : 'POST',
        body : JSON.stringify({ username : this.state.username,
                                password : this.state.password,
                                email    : this.state.email}),
        headers : new Headers({
          'Content-Type' : 'application/json',
          'Accept' : 'application/json',
        })})
        .then(result => {
          return result.json();
        })
        .then(result => {
          console.log('Success');
          //We are really just going to do a route navigation here upon success.
        })
        .catch(error => {
          console.log(error);
        });
    }
    else {
      fetch('https://vast-fortress-13759.herokuapp.com/api/login', {
        method : 'POST',
        body : JSON.stringify({ username : this.state.username,
                                password : this.state.password}),
        headers : new Headers({
          'Content-Type' : 'application/json',
          'Accept' : 'application/json',
        })
        .then(result => {
          return result.json();
        })
        .then(result => {
          console.log('Success');
          //We are really just going to do a route navigation here upon success.
        })
        .catch(error => {

        })

      });
    };
  }

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.loginBox}>
            <Container>
              <Item rounded style={styles.username}>
                <Input onChangeText={((text) => this.setState({ text : text }))}
                placeholder='Username'/>
              </Item>
              <Item rounded style={styles.password}>
                <Input secureTextEntry={true} onChangeText={((text) => this.setState({ text : text }))}
                placeholder='Password'/>
              </Item>
              { this.state.register ?
                <Item rounded style={styles.email}>
                  <Input onChangeText={text => this.setState({ email : text })}
                  placeholder='Email'/>
                </Item>
              :
                null }
              <Button bordered warning
                      style={styles.button}
                      onPress={() => this.onClick()}>
                <Text> {this.state.register ? 'Register' : 'Submit' } </Text>
              </Button>
            </Container>
        </View>
        <View style={styles.register}>
          <Text > {this.state.register ? "" : "Don't have an account? Sign up."} </Text>
          <Button bordered warning
                onPress={() => {this.setState({
                register : !this.state.register,
              })}} style={styles.button}>
            <Text> { this.state.register ? "Back to Login" : "Register" } </Text>
          </Button>
        </View>
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
  email : {
    alignSelf : 'center',
    width : 300,
    margin : 30,
  },
  button : {
    alignSelf : 'center',
    margin : 10,
  },
  register : {
    position : 'absolute',
    top : Dimensions.get('window').height - 100,
    alignSelf : 'center',
  }
});
