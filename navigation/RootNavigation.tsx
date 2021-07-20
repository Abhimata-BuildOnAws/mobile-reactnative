import { NavigationContainerRef } from '@react-navigation/native';
import * as React from 'react';


export const navigationRef = React.useRef<NavigationContainerRef>(null);

export function navigate(name: string, params: any) {
    navigationRef.current?.navigate(name, params);
  }
