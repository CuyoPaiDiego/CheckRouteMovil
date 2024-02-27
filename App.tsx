import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigators/StackNavigator';
import 'react-native-gesture-handler';


export default function App() {
  return (
    
      <NavigationContainer>
        <StackNavigator/>        
      </NavigationContainer>
    
  );
}


