import React, {  useEffect, useState } from 'react'
import {StyleSheet,Image, View, Text } from 'react-native'
import { connect } from 'react-redux';

const ShowImage = (props) => {

  const [location, setLocation] = useState(null)

  useEffect(() => {
   /* <-------take values from the redux-store-------->*/
    if (props.location != null) {
      const { location } = props.location
      setLocation(location)
    }
  }, [props.location]);

  return (
    <View style={Styles.container}>
      <Text> Latitude : {location && location.latitude}</Text>
      <Text>Longitude : {location && location.longitude}</Text>
      {location && location.sourceURL !== ''&&
      <Image  source={{uri:location.sourceURL}}
       style={ Styles.image} />
      }
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image:{
    height:'80%', width:'80%',
    backgroundColor:'gray',
    marginTop: 10
  },
  button: {
    height: 50,
    padding: 10,
    marginBottom: 10,
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
export default connect(mapStateToProps)(ShowImage)