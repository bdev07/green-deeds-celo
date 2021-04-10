import React, { ReactElement } from 'react';
import {
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScreenWrapper = ({ children }, Props) = ReactElement => {
  return (
<>
    {
        Platform.OS === 'ios'
          ? (
            <SafeAreaView style={{ flex: 1 }}>
              {children}
            </SafeAreaView>
          )
          : (
            <>
              {children}
            </>
          )
      }
</>
  );
};

export default ScreenWrapper;