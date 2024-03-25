// page2.js



import { useState, useEffect, useCallback } from 'react';
import { Alert, Button, Text, Pressable, View, Image } from 'react-native';
import 'react-native-gesture-handler';
import { Link, useNavigation, useLocalSearchParams, } from 'expo-router';
import { Audio } from 'expo-av';
import Styles from '../styles/page-styles';
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


// "/" means index.js




export default function Page() {

    const [myPBO, setMyPBO] = useState(null);//hold my playnack object
    const [playBackStatus, setPlaybackStatus] = useState("Unloaded");//status
    const [audioChange, setAudioChange] = useState(null);//to keep track of audio
    
    const [playback, setPlayback] = useState(null); // the playback object

    const gorillaWel = require('../assets/gorillaWel.gif'); // get gorilla welcome gif
    const gorillaMove = require('../assets/gorillam.gif'); // get gorilla move gif

    const [image, setImage] = useState(gorillaWel);

    const navigation = useNavigation(); // to navigate to page2

    

    //load a sound into the PBO 
    const loadSound = async (soundNumber) => {

        setAudioChange(soundNumber);

        let audio = audioList[soundNumber];
        try {

           
            const soundObj = new Audio.Sound()
           
           
            

            // const { sound } = await Audio.Sound.createAsync(audio);

            await soundObj.loadAsync(audio)
          
            setMyPBO(soundObj)

            setPlaybackStatus("Loaded");

            playPBO();
            console.log('loades',soundNumber);
        } catch (error) {
            console.log(error);
        }
    }

    //play a pbo
    const playPBO = async () => {

      try {

         

               myPBO.playAsync();

              setPlaybackStatus("Playing")
         
       } catch (e) {
            console.log(e);
        }
    }

   //unload a pbo
    const unloadPBO = async () => {
            if (myPBO)
                await myPBO.unloadAsync();

                setPlaybackStatus("Unloaded");
            
    }

    //animation
    // took from react native Reanimated -> Handaling gestures
    const pressed = useSharedValue(false);
    const offset = useSharedValue(0);

    const pan = Gesture.Pan()
        .onBegin(() => {
           console.log("Gesture began");
            pressed.value = true;
        })
        .onChange((event) => {
           console.log("Gesture chagne");
            offset.value = event.translationX;
           pressed.value = true;
        })
        .onFinalize(() => {
           console.log("Gesture done");
            offset.value = withSpring(0);
            pressed.value = false;
        });

    const animatedStyles = useAnimatedStyle(() => ({


        transform: [
            { translateX: offset.value },

        ],
      
       
        
    }));
   

    //use effect to chnage emage if pressed vlaue is true
 useEffect(() => {
    console.log("Pressed value changed:", pressed.value);
    if (pressed.value === true)
    {
        setImage( gorillaMove);
    }
    
    
}, [pressed.value]);


    // This effect hook will make sure the app stops recording when it ends
    useEffect(() => {
        return () => {
           
        };
    }, []);



    return (

        

        <View style={Styles.page}>

           

            <View style={Styles.backButton}>
              <Button
                color="lightblue" 
                title="<-"
                onPress={() => {

                    navigation.goBack();

                }}
             /> 

            </View>

           

             
         
            

            

                <GestureHandlerRootView style={Styles.container}>
                    <View style={Styles.container}>
                        <GestureDetector gesture={pan}>
                        <Animated.View style={[animatedStyles]}>
                            <Image
                                source={image }
                                style={Styles.pet }
                            />

                        </Animated.View>
                        </GestureDetector>
                    </View>
                </GestureHandlerRootView>
                
      
              
         
                    
               


      

                       
         </View>



          
        
    );
}

    