import * as React from 'react';
import { useState, useEffect } from "react";
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Colors from '../components/Colors';
import Camera from "../screens/cameraPosting/Camera";
import DashboardScreen from "../screens/userDashboard/DashboardScreen";
import MapScreen from "../screens/map/MapScreen";
import { Ionicons } from "@expo/vector-icons";

import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 



export default function TabRoutes()  {
  const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
              screenOptions={({navigation})=>({
                headerStyle: { backgroundColor: Colors.purple },
                headerTintColor: "white",
                tabBarStyle: { backgroundColor: Colors.purple },
                tabBarActiveTintColor: Colors.yellow,
        
               
              })}
            >
              <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                  title: "Map",
                  tabBarIcon: ({ color, size }) => (
                    <Feather name="map-pin" size={size} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="Camera"
                component={Camera}
                options={{
                  title: "Camera",
                  tabBarIcon: ({ color, size }) => (
                    <AntDesign name="camerao" size={size} color={color} />
                  ),
                }}
              />
        
        <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={({ navigation }) => {
                  return {
                    title: "Dashboard",
                    tabBarIcon: ({ color, size }) => (
                      <FontAwesome name="user-circle-o" size={size} color={color} />
                    ),
                    headerRight: () => {
                      return <Button title="Logout" onPress={() => signOut(auth)} />;
                    },
                  };
                }}
              />
            </Tab.Navigator>
        
    );
}