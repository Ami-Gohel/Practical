import Geolocation from 'react-native-geolocation-service';

 export const  geolocate= async () =>{
   let response = null
  Geolocation.requestAuthorization('whenInUse')
.then((result) => {
  console.log( 'result')
if (result === 'granted') {
// success case

Geolocation.getCurrentPosition(
(coords) => {
  let {latitude,longitude } = coords
  response = coords.coords

 },
(err) => {
  console.error('geo Error', err);
},
{ enableHighAccuracy: false, timeout: 20000, maximumAge:  1000 },
);
}
})
.catch((error) => console.log(error));

console.log( 'res',response)

}


 
