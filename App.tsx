import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import List from './app/screens/List';
import Details from './app/screens/Details'
import Login from './app/screens/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {

  const [authenticated, setAuthenticated]=useState('');

  useEffect(()=>{
    onAuthStateChanged
  })

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='List'>
        <Stack.Screen name="My Todos" component={List} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Details" component={Details} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


