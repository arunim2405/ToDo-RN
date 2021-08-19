/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
 import { Text } from "react-native-magnus";
import Home from "./src/Views/Home"



const App: () => Node = () => {
  return (
    <View style={{backgroundColor:"#F1F6F9", height:"100%"}}>
     <Home/>
   </View>
  );
};

const styles = StyleSheet.create({

});

export default App;
