import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Dimensions
} from 'react-native';

import { Container, Button, Text, Item, Input } from 'native-base';

import MapView, { Marker, Callout } from 'react-native-maps';

import CalendarPicker from 'react-native-calendar-picker';

import PopupDialog from 'react-native-popup-dialog';

let id = 0;

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text : this.props.text,
      popup : false,
      latitude : this.props.latitude,
      longitude : this.props.longitude,
      markers : [],
      eventText : null,
      description : null,
      link : null,
      markerCoordinate : null,
      selectedStartDate : null,
    };
    this.onMarkerPress = this.onMarkerPress.bind(this);
    this.onMapPress = this.onMapPress.bind(this);
    this.createMarker = this.createMarker.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }


  createMarker() {

    this.setState({
      markers : [
        ...this.state.markers,
        {
          coordinate : this.state.markerCoordinate,
          key: id++,
          color: '#AAAAA',
          callout : {
            eventText : this.state.eventText,
            description : this.state.description,
            link : this.state.link,
          },
        }
      ],
    });
    this.popupDialog.dismiss();
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  onMarkerPress(e) {
    console.log(e.nativeEvent);
  }

  onMapPress(e) {
    this.popupDialog.show();

    this.setState({
      markerCoordinate : e.nativeEvent.coordinate,
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.container}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={(e) => this.onMapPress(e)}
        >
          {this.state.markers.map(marker => (
            <Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.pinColor}
              onPress={(e) => {e.stopPropagation(); this.onMarkerPress(e);}}
            >
             <Callout>
                <View>
                  <Text> {marker.callout.eventText}</Text>
                  <Text> {marker.callout.description} </Text>
                  <Text> {marker.callout.link} </Text>

                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
        //In the future, add react-native-modal here instead of PopupDialog
        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
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
              onDateChange={this.onDateChange}
            />
            <Button onPress={this.createMarker}>
              <Text> Submit </Text>
            </Button>
          </View>
        </PopupDialog>
        <Text style={styles.welcome}> {this.state.text} </Text>
      </View>
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
