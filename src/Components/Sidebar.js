import React, { Component } from 'react';

import {
  View
} from 'react-native';

import { Text, Button, Content, List, ListItem, Left, Icon } from 'native-base';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Content style={{ backgroundColor : '#FFFFFF'}}>
        <List>
          <ListItem> <Text> Welcome </Text> </ListItem>
          <ListItem> <Text> This an example </Text> </ListItem>
          <ListItem onPress={() => this.props.navigation.navigate(
            'EntryScreen'
          )}> <Text> Search </Text> </ListItem>
          <ListItem icon> <Left> <Icon name="contacts"/> </Left> <Text> Friends </Text> </ListItem>
        </List>
      </Content>
    );
  }
}
