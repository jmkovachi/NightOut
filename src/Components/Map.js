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
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Picker, DatePicker } from 'react-native-wheel-datepicker';
import MarkerView from './MarkerView.js';
import Sidebar from './Sidebar.js';

let id = 0;

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text : this.props.navigation.state.params.text,
      popup : false,
      latitude : this.props.navigation.state.params.latitude,
      longitude : this.props.navigation.state.params.longitude,
      markers : this.props.navigation.state.params.markers,
      markerCoordinate : null,
      selectedStartDate : null,
      isVisible : false,
      draw : false,
      date : false,
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

  addMarkers = () => {
    fetch('http://127.0.0.1:4000/api/addmarkers', {
      method: 'POST',
      body : JSON.stringify({ markers : this.state.markers }),
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
    })
    .catch(error => {
      console.log(error);
      // Add a popup that says that the search failed
    });
  }

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
    if (this.state.draw) {
      this.setState({
        isVisible : true,
        markerCoordinate : e.nativeEvent.coordinate,
      });
    }
  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<Sidebar navigation={this.props.navigation}/>}
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
          { this.state.date ?
            [
              <DatePicker
                key={1}
                mode="date"
                onDateChange={(date) => console.log(date)}
                style={{ position : 'absolute', top : 0, left : 0, right : 0,}}
              />,
              <Button
                key={2}
                onPress={() => this.setState({ date : false })}
                style={{ position : 'absolute', top : 200, left : 100, right : 100}}>
                <Text style={{alignSelf : 'center'}}> Submit </Text>
              </Button>
            ]
            :
              null }
          <Button style={styles.button} onPress={() => this.openDrawer()}>
            <Icon name="menu" size={30} style={{backgroundColor : 'transparent'}} />
          </Button>
          <Button style={this.state.draw ? styles.drawButtonHighLighted : styles.drawButton}
                  onPress={(e) => {e.stopPropagation(); this.setState({ draw : !this.state.draw });}}>
            <Icon style={styles.brush} size={20} name="round-brush"/>
          </Button>
          <Button style={this.state.date ? styles.dateButtonHighLighted : styles.dateButton}
                  onPress={() => this.setState({ date : !this.state.date })}>
            <MaterialIcon style={styles.brush} size={20} name="date-range"/>
          </Button>
          // MarkerView is the component that holds our marker creation view
          <MarkerView
                      isVisible={this.state.isVisible}
                      createMarker={this.createMarker}
                      onDateChange={this.onDateChange}
                      />
          <Button style={{ position : 'absolute', bottom : 0, right : 0}}
                  onPress={() => this.addMarkers()}>
                  <Text> Add markers </Text>
          </Button>
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
    top : 10,
    backgroundColor: 'transparent',
  },
  drawButton : {
    position : 'absolute',
    top : 20,
    right : 10,
    width : 30,
    height : 30,
    borderRadius : 30,
    flex : 1,
    backgroundColor : 'transparent',
  },
  drawButtonHighLighted : {
    position : 'absolute',
    top : 20,
    right : 10,
    width : 30,
    height : 30,
    borderRadius : 30,
    flex : 1,
    backgroundColor : 'gold',
  },
  dateButton : {
    position : 'absolute',
    top : 60,
    right : 10,
    width : 30,
    height : 30,
    borderRadius : 30,
    flex : 1,
    backgroundColor : 'transparent',
  },
  dateButtonHighLighted : {
    position : 'absolute',
    top : 60,
    right : 10,
    width : 30,
    height : 30,
    borderRadius : 30,
    flex : 1,
    backgroundColor : 'blue',
  },
  brush : {
    borderRadius : 5,
    alignSelf : 'center',
    bottom : 4,
    left : 4,
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
