import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import * as React from 'react';

export default function AuthStack(Stack) {
    return(
        <>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        </>
    );
}