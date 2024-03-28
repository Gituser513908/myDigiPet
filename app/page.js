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

    const navigation = useNavigation(); // to navigate to page2
    const [myPBO, setMyPBO] = useState(null);//hold my playnack object
    const [playBackStatus, setPlaybackStatus] = useState("Unloaded");//status
    const [audioChange, setAudioChange] = useState(null);//to keep track of audio
    
    const [playback, setPlayback] = useState(null); // the playback object

    const gorillaWel = require('../assets/gorillaWel.gif'); // get gorilla welcome gif
    const gorillaMove = require('../assets/gorillam.gif'); // get gorilla move gif
    const gorillaMad = require('../assets/gorillaS.gif'); // get gorilla Mad gif
    const gorillaDead = require('../assets/gorillaD.jpg'); // get gorilla dead gif

    const [image, setImage] = useState(gorillaWel); // set GIF

    const [petHappy, setPetHappy] = useState(100); // start at 100 happiness level
   

    

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
   

    //chnage GIF when pressed
    const changeGif = () => {

        setImage(gorillaMove);// chnage GIF to moving gorilla when pressed

        //after 5 sec chnage back to original GIF

       // setTimeout(() => {
         //   setImage(gorillaWel);
        //}, 5000);
    };

    //add happiness when GIF is pressed
    const addHappy = () => {

        setPetHappy((currentHappy) => Math.min(currentHappy + 10, 100)); // add 5 to happiness cap it at 100
    };

    //decrease happiness by 5
    const notHappy = () => {

        setPetHappy((currentHappy) => Math.max(currentHappy - 5, 0)); // minus 5 to happiness cap it at 0
    };

    //run notHappy function every 5 sec when loaded 
    useEffect(() => {
        
        const interval = setInterval(() => {
            notHappy();
        }, 5000);

        //  clear the interval
        return () => clearInterval(interval);
    }, []);

    // chnage GIF when haapiness chnages
    useEffect(() => {
        
        if (petHappy <= 0) {

            setImage(gorillaDead); // Change image to gorilla dead
            
        } else if ( petHappy <= 50) {

            setImage(gorillaMad); // Change image to gorilla mad

        } 

    }, [petHappy]);// petHappy chnages


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

           
            <Text>Happiness: {petHappy}</Text>
            
                <GestureHandlerRootView style={Styles.container}>
                    <View style={Styles.container}>
                        <GestureDetector gesture={pan}>
                        <Animated.View style={[animatedStyles]}>

                            <Pressable
                                onPress={() => {
                                    changeGif();

                                    addHappy();

                                }}// when pressed chnage GIF to move gorilla and add happiness
                                
                            >
                            <Image
                                source={image}
                                style={Styles.pet }
                                />
                            </Pressable>

                        </Animated.View>
                        </GestureDetector>
                    </View>
                </GestureHandlerRootView>
                
      
              
         
                    
               


      

                       
         </View>



          
        
    );
}

    