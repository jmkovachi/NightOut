import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Dimensions
} from 'react-native';

import { Container, Content, Button, Text, Item, Input, Drawer } from 'native-base';

import MapView, { Marker, Callout } from 'react-native-maps';

import Modal from 'react-native-modal';

import CalendarPicker from 'react-native-calendar-picker';

import PopupDialog from 'react-native-popup-dialog';

import Icon from 'react-native-vector-icons/Entypo';

import MarkerView from './MarkerView.js';

let id = 0;

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text : this.props.navigation.state.params.text,
      popup : false,
      latitude : this.props.navigation.state.params.latitude,
      longitude : this.props.navigation.state.params.longitude,
      markers : [],
      markerCoordinate : null,
      selectedStartDate : null,
      isVisible : false,
    };
    this.onMarkerPress = this.onMarkerPress.bind(this);
    this.onMapPress = this.onMapPress.bind(this);
    this.createMarker = this.createMarker.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  closeDrawer = () => {
      this.drawer._root.close()
    };

  openDrawer = () => {
    this.drawer._root.open()
  };

  createMarker(eventText, description, link) {
    this.setState({
      isVisible : false,
      markers : [
        ...this.state.markers,
        {
          coordinate : this.state.markerCoordinate,
          key: id++,
          color: '#AAAAA',
          callout : {
            eventText : eventText,
            description : description,
            link : link,
          },
        }
      ],
    });

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
    this.setState({
      isVisible : true,
    });

    this.setState({
      markerCoordinate : e.nativeEvent.coordinate,
    });

  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<Content style={{backgroundColor:'#FFFFFF'}}>
                <Button onPress={() => this.props.navigation.navigate('EntryScreen')}>
                  <Text> Back to Search </Text>
                </Button>
              </Content>}
        onClose={() => this.closeDrawer()} >
      // Main View

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
          // MarkerView is the component that holds our marker creation view
          <Button style={styles.button} onPress={() => this.openDrawer()}>
            <Icon name="menu" size={30} style={{backgroundColor : 'transparent'}} />
          </Button>
          <MarkerView
                      isVisible={this.state.isVisible}
                      createMarker={this.createMarker}
                      onDateChange={this.onDateChange}
                      />
          <Text style={styles.welcome}> {this.state.text} </Text>
        </View>
      </Drawer>
    );
  }
}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width : Dimensions.get('window').width,
      height : Dimensions.get('window').height,
      backgroundColor : 'transparent',
    },
    welcome: {
      position : 'absolute',
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      bottom : 5,
    },
    button: {
      position : 'absolute',
      top : 0,
      backgroundColor: 'transparent',
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
