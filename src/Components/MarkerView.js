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
        transparent={true}
        backdropColor="transparent"
        style={{flex : 1}}
        >
        <ScrollView style={{backgroundColor : 'white', borderRadius : 30,
                      maxWidth : 300,
                      maxHeight : 500,
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
            width={250}
            height={250}
          />
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
  }
})
