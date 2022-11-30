// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View,Button } from 'react-native';
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NavigationContainer } from "@react-navigation/native";

// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from "./firebase/firebase-setup";
// import React, { useState, useEffect } from "react";

// import Colors from "./components/Colors";
// import { Ionicons } from "@expo/vector-icons";

// import { Feather } from '@expo/vector-icons'; 
// import { AntDesign } from '@expo/vector-icons'; 
// import { FontAwesome } from '@expo/vector-icons'; 

// import Login from "./screens/auth/Login";
// import Signup from "./screens/auth/Signup";


// import EventDetailPage from "./components/EventDetailPage";

// import Camera from "./screens/cameraPosting/Camera";
// import CameraNextStepPage from "./screens/cameraPosting/CameraNextStepPage";
// import FindEventPage from "./screens/cameraPosting/FindEventPage";

// import DashboardScreen from "./screens/userDashboard/DashboardScreen";
// import CreateEventPage from "./screens/userDashboard/CreateEventPage";
// import PostHistoryPage from "./screens/userDashboard/PostHistoryPage";
// import EventHistoryPage from "./screens/userDashboard/EventHistoryPage";
// import ChooseTimePage from "./screens/userDashboard/ChooseTimePage";
// import ChoosePositionPage from "./screens/userDashboard/ChoosePositionPage";
// import ManageEventPage from "./screens/userDashboard/ManageEventPage";

// import TipIcon from './components/TipIcon';
// import MapScreen from './screens/map/MapScreen';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import Routes from './Navigation/Routes';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// function MajorScreens() {
//   return (
//     <Tab.Navigator
//       screenOptions={({navigation})=>({
//         headerStyle: { backgroundColor: Colors.purple },
//         headerTintColor: "white",
//         tabBarStyle: { backgroundColor: Colors.purple },
//         tabBarActiveTintColor: Colors.yellow,

       
//       })}
//     >
//       <Tab.Screen
//         name="Map"
//         component={MapScreen}
//         options={{
//           title: "Map",
//           tabBarIcon: ({ color, size }) => (
//             <Feather name="map-pin" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Camera"
//         component={Camera}
//         options={{
//           title: "Camera",
//           tabBarIcon: ({ color, size }) => (
//             <AntDesign name="camerao" size={size} color={color} />
//           ),
//         }}
//       />

// <Tab.Screen
//         name="Dashboard"
//         component={DashboardScreen}
//         options={({ navigation }) => {
//           return {
//             title: "Dashboard",
//             tabBarIcon: ({ color, size }) => (
//               <FontAwesome name="user-circle-o" size={size} color={color} />
//             ),
//             headerRight: () => {
//               return <Button title="Logout" onPress={() => signOut(auth)} />;
//             },
//           };
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// export default function App() {
//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsUserAuthenticated(true);
//       } else {
//         setIsUserAuthenticated(false);
//       }
//     });
//   });
//   const AuthStack = (
//     <>
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="Signup" component={Signup} />
//     </>
//   );

//   const AppStack = (
//     <>
//         <Stack.Screen
//             name="MajorScreens"
//             component={MajorScreens}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="CameraNextStepPage"
//             component={CameraNextStepPage}
//             options={{title:'Create a post'}}
//           />
//            <Stack.Screen
//             name="ChoosePositionPage"
//             component={ChoosePositionPage}
//             options={{title:'Choose Position'}}
//           />
//           <Stack.Screen
//             name="ChooseTimePage"
//             component={ChooseTimePage}
//             options={{title:'Choose Time'}}
//           />
//           <Stack.Screen
//             name="CreateEventPage"
//             component={CreateEventPage}
//             options={{title:'Create Event'}}
//           />
//           <Stack.Screen
//             name="ManageEventPage"
//             component={ManageEventPage}
//             options={{title:'Manage Event'}}
//           />
//           <Stack.Screen
//             name="EventDetailPage"
//             component={EventDetailPage}
//             options={{title:'Event Detail',
//             headerRight:()=>(<TipIcon size={24} color={"white"} onPress={()=>{
              
//             }}/>),
//           }}
//           />
//            <Stack.Screen
//             name="EventHistoryPage"
//             component={EventHistoryPage}
//             options={{title:'Event History'}}
//           />

//           <Stack.Screen
//             name="FindEventPage"
//             component={FindEventPage}
//             options={{title:'Find Event'}}
//           />
//           <Stack.Screen
//             name="PostHistoryPage"
//             component={PostHistoryPage}
//             options={{title:'Post History'}}
//           />



//     </>
//   );

//   const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         screenOptions={{
//           headerStyle: { backgroundColor: Colors.purple },
//           headerTintColor: "white",
//           headerTitleAlign: "center",
//         }}
//       >
//         {isUserAuthenticated ? AppStack : AuthStack}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );

// }
import { View, Text, StyleSheet, Button } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./Navigation/Routes";
import * as React from 'react';


const App = () => {
  return (
      <SafeAreaProvider>
        <Routes />
      </SafeAreaProvider>
  );
};

export default App;
