import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';

import Modal from 'react-native-modal';

import { Container, Button, Text, Item, Input, Picker } from 'native-base';

import CalendarPicker from 'react-native-calendar-picker';

import Icon from 'react-native-vector-icons/Entypo';

export default class MarkerView extends Component {
  constructor(props) {
    super(props);
    state = {
      isVisible : false,
      eventText : null,
      description : null,
      link : null,
      eventType : '',
    };
    this.eventChange = this.eventChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      isVisible : this.props.isVisible,
    });
  }

  eventChange(val) {
    this.setState({
      eventType : val,
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
        transparent={true}
        backdropColor="transparent"
        style={{flex : 1}}
        >
        <ScrollView style={{backgroundColor : 'white', borderRadius : 30,
                      maxWidth : 400,
                      maxHeight : 550,
                      alignSelf : 'center',
                    }}>
          <Item style={styles.textbox} regular>
            <Input
              onChangeText={((text) => this.setState({ eventText : text }))}
              placeholder='Event name' />
          </Item>
          <Item style={styles.textbox} regular>
            <Input
              onChangeText={((text2) => this.setState({ description : text2 }))}
              placeholder='Event description' />
          </Item>
          <Item style={styles.textbox}  regular>
            <Input
              onChangeText={((text3) => this.setState({ link : text3 }))}
              placeholder='Link' />
          </Item>
          <CalendarPicker
             style={styles.textbox}
            onDateChange={this.props.onDateChange}
            width={2750}
            height={250}
          />
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="chevron-down" />}
            placeholder="What type of event is this?"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            style={{ width: undefined }}
            selectedValue={this.state.eventType}
            onValueChange={this.eventChange}
            >
            <Picker.Item label="Private" value="private" />
            <Picker.Item label="Public" value="public" />
          </Picker>
          <Button onPress={() => {
                            this.setState({ isVisible : false });
                            this.props.createMarker(this.state.eventText,
                                                    this.state.description,
                                                    this.state.link);
                          }}>
            <Text> Submit </Text>
          </Button>
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  textbox : {
    margin : 30,
    paddingLeft : 20,
    paddingRight : 20,
  }
})
