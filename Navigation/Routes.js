import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from 'react';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth } from "../firebase/firebase-setup";
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { onAuthStateChanged, signOut } from "firebase/auth";


export default function Routes() {
    const Stack = createNativeStackNavigator();
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setIsUserAuthenticated(true);
          } else {
            setIsUserAuthenticated(false);
          }
        });
      });

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isUserAuthenticated ? MainStack(Stack) : AuthStack(Stack)}
            </Stack.Navigator>
        </NavigationContainer>
    )
}