import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  View,
  Image,
  Dimensions
} from 'react-native';

import Modal from 'react-native-modal';

import { Container, Button, Text, Item, Input } from 'native-base';

import CalendarPicker from 'react-native-calendar-picker';

export default class MarkerView extends Component {
  constructor(props) {
    super(props);
    state = {
      isVisible : false,
      eventText : null,
      description : null,
      link : null,
    };
  }

  componentWillMount() {
    this.setState({
      isVisible : this.props.isVisible,
    });
  }

  /*
    In the future try getDerivedStateFromProps?
  */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      isVisible : nextProps.isVisible,
    });
  }

  render() {
    return (
      <Modal
        isVisible={this.state.isVisible}
        onBackdropPress={() => this.setState({ isVisible: false })}
        onSwipe={() => this.setState({ isVisible: false })}
        swipeDirection="left"
        >
        <View>
          <Item regular>
            <Input
              onChangeText={((text) => this.setState({ eventText : text }))}
              placeholder='Event name' />
          </Item>
          <Item regular>
            <Input
              onChangeText={((text2) => this.setState({ description : text2 }))}
              placeholder='Event description' />
          </Item>
          <Item regular>
            <Input
              onChangeText={((text3) => this.setState({ link : text3 }))}
              placeholder='Link' />
          </Item>
          <CalendarPicker
            onDateChange={this.props.onDateChange}
          />
          <Button onPress={() => {
                            this.setState({ isVisible : false });
                            this.props.createMarker(this.state.eventText,
                                                    this.state.description,
                                                    this.state.link);
                          }}>
            <Text> Submit </Text>
          </Button>
        </View>
      </Modal>
    );
  }
}
