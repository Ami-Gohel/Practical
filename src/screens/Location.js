
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, PermissionsAndroid, Text, View, Platform } from 'react-native'
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Geolocation from 'react-native-geolocation-service';
import { addLocation } from '../Redux/Actions'


const Location = (props) => {

  const [location, setLocation] = useState(null)

  useEffect(() => {
    if (props.location != null) {
      const { location } = props.location
      setLocation(location)
    }
  }, [props.location]);

  const getLocation = async()=>{
    Geolocation.getCurrentPosition(
      (res) => {
        let { coords } = res
        let { latitude, longitude } = coords
        props.addLocation({ latitude, longitude })
      },
      (err) => {
       alert('geo Error', err);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );
  } 

  const geolocatePermission =  () => {
    if (Platform.OS == 'ios') {
      Geolocation.requestAuthorization('whenInUse')
        .then((result) => {
          if (result === 'granted') {
           getLocation()
          }
        })
        .catch((error) =>alert(error));
    }
    else {
       PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "App Geolocation Permission",
          message: "App needs access to your phone's location.",
        }
      ).then((granted)=>{
      if (granted) {
        getLocation()
      }
    })
  }}

 const navToPreview=(image)=>{
  let params = {
    latitude: location.latitude,
    longitude: location.longitude,
    sourceURL: image.path
  }
  props.addLocation(params)
  props.navigation.navigate('ShowImage')
 }
 
  const takePicture = (type) => {
    if(location == null){
      alert('Please select Loction first')
      return
    }
    if(type== 'camera'){
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      navToPreview(image)
    });
  }
  else  {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      navToPreview(image)
    });
  }
  }

  return (
    <View style={Styles.container}>
      <Text> Latitude : {location && location.latitude}</Text>
      <Text>Longitude : {location && location.longitude}</Text>
      <TouchableOpacity style={Styles.button} onPress={() => geolocatePermission()}>
        <Text>Get location</Text>
      </TouchableOpacity>     
      <TouchableOpacity   style={Styles.button} onPress={() => takePicture('camera')}>
        <Text>Click photo</Text>
      </TouchableOpacity>
      <TouchableOpacity   style={Styles.button} onPress={() => takePicture('gellary')}>
        <Text>Select photo</Text>
      </TouchableOpacity>
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    height: 50,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    alignSelf: 'center',
    borderColor: 'black'
  }

})
const mapStateToProps = (state) => {
  return {
    location: state.Location,
  };
}
export default connect(mapStateToProps, { addLocation })(Location)