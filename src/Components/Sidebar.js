import React, { Component } from 'react';

import {
  View,
  StyleSheet
} from 'react-native';

import { Header, Text, Button, Content, List, ListItem, Left, Icon } from 'native-base';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Content style={{ backgroundColor : '#232426'}}>
        <Header style={{ backgroundColor : '#232426'}}> <Text style={styles.text}> NightOut </Text></Header>
        <List>
          <ListItem> <Text style={styles.text}> Explore </Text> </ListItem>
          <ListItem> <Text style={styles.text}> Plans </Text> </ListItem>
          <ListItem onPress={() => this.props.navigation.navigate(
            'EntryScreen'
          )}> <Text style={styles.text}> Search </Text> </ListItem>
          <ListItem> <Text style={styles.text}> Friends </Text> </ListItem>
          <ListItem> <Text style={styles.text}> Settings </Text></ListItem>
        </List>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  text : {
    color : '#3a85ff'
  }
})
