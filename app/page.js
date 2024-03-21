// page2.js



import { useState, useEffect, useCallback } from 'react';
import { Alert, Button, Text, Pressable, View } from 'react-native';
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
            pressed.value = true;
        })
        .onChange((event) => {
            offset.value = event.translationX;
        })
        .onFinalize(() => {
            offset.value = withSpring(0);
            pressed.value = false;
        });

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: offset.value },
            
        ],
        
    }));
   

  

  
        

   

    // This effect hook will make sure the app stops recording when it ends
    useEffect(() => {
        return () => {
            recordings.forEach(async recording => {
                await recording.stopAndUnloadAsync();
            });
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
                            <Animated.View style={[Styles.circle, animatedStyles]} />
                        </GestureDetector>
                    </View>
                </GestureHandlerRootView>
                
      
              
         
                    
               


      

                       
         </View>



          
        
    );
}

    