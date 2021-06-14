import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Location from './screens/Location';
import ShowImage  from './screens/ShowImage';


const Stack = createStackNavigator(); 

export default class Appnavigation extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Location" component={Location}/>
                    <Stack.Screen name="ShowImage" component={ShowImage} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}