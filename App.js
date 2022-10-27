import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Feed from './Feed'
import More from './More'
import Create from './Create'

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  render() {
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Feed'
            component={Feed}
            options={({ navigation }) => ({
              title: 'Help Out!',
              headerRight: () => (
                <Button onPress={() => {
                  navigation.navigate('Create');
                }} title='Create'></Button>
              )
            })}
          />
          <Stack.Screen
            name='More'
            component={More}
            options={({ navigation }) => ({
              title: 'More Info',
              headerBackTitle: 'Back'
            })}
          />
          <Stack.Screen
            name='Create'
            component={Create}
            options={({ navigation }) => ({
              title: 'Create Opportunity',
              headerBackTitle: 'Back'
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}