import * as React from 'react';
import TabRoutes from './TabRoutes';

export default function MainStack(Stack) {

  return (
      <>
          <Stack.Screen
              component={TabRoutes}
              options={{ headerShown: false }}
          />
  
      </>
  )
}