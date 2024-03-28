Assignment 4 - DigiPet by Rajan Chaudhari

What the app does:

you have a Gorilla when startrs it is in welcome phase

you press it it truns to moving Gorilla

your pet has Happiness level you tap him he happy addes 10 pts

No Tapping with 5 sec happiness goes down by 5

Happiness reaches <=50 gorilla angry, roars (sound) and vibrates phone until you tap it to make it happy > 50

you can also swipe gorilla left & right , will come back in center

can save by clicking Save sate btn


Happiness 0 - poor gorilla Dead

shows dead goriila for 4 sec then show the screen with revive btn (He never died)

start again

**Heads up**
roaring maybe loud - Don't be scared Tap him make him happy

Errors
when cloned did give me error about not finding Expo

npm install -g expo-cli
also
npm install

//Dependecies

import { useState, useEffect, useCallback } from 'react';
import { Alert, Button, Text, Pressable, Vibration, View, Image } from 'react-native';
import 'react-native-gesture-handler';
import { Link, useNavigation,  } from 'expo-router';
import { Audio } from 'expo-av';
import Styles from '../styles/page-styles';
import * as FileSystem from 'expo-file-system';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,


} from 'react-native-reanimated';

import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
    PanGestureHandler,
    
} from 'react-native-gesture-handler';


GIFS and Sound paths 

  const gorillaWel = require('../assets/gorillaWel.gif'); // get gorilla welcome gif
  
    const gorillaMove = require('../assets/gorillam.gif'); // get gorilla move gif
    
    const gorillaMad = require('../assets/gorillaS.gif'); // get gorilla Mad gif
    
    const gorillaDead = require('../assets/gorillaD.jpg'); // get gorilla dead gif
    
    const angryGorillaSound = require('../assets/gorillaSound.mp3'); // get angry gorilla voice

//using react native reanimated which needed plugin added to babel.config.js

module.exports = function(api) {
  api.cache(true);
  return {
      presets: ['babel-preset-expo'],
      plugins: ['react-native-reanimated/plugin',] <------------
  };
};

Thank you
