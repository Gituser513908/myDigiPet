// page2.js



import { useState, useEffect, useCallback } from 'react';
import { Alert, Button, Text, Pressable, View, Image } from 'react-native';
import 'react-native-gesture-handler';
import { Link, useNavigation, useLocalSearchParams, } from 'expo-router';
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
    const angryGorillaSound = require('../assets/gorillaSound.mp3'); // get angry gorilla voice
    const [gorillaAlive, setGorillaAlive] = useState(true); // set gorilla alive when loaded to true

    const [image, setImage] = useState(gorillaWel); // set GIF

    const [petHappy, setPetHappy] = useState(100); // start at 100 happiness level

    const fileName = 'statefile.json'; // file name to store state

    

    //load a sound into the PBO 
    const loadSound = async () => {

        

      
        try {

           
            const soundObj = new Audio.Sound()
           
           
            

            // const { sound } = await Audio.Sound.createAsync(audio);

            await soundObj.loadAsync(angryGorillaSound)
          
            setMyPBO(soundObj)

            setPlaybackStatus("Loaded");

           
            
        } catch (error) {
            console.log(error);
        }
    }

    //play a pbo
    const playPBO = async () => {

      try {

         

              await myPBO.playAsync();

              setPlaybackStatus("Playing")
         
       } catch (e) {
            console.log(e);
        }
    }

   //unload a pbo
    const unloadPBO = async () => {
            
                await myPBO.unloadAsync();

                setPlaybackStatus("Unloaded");
            
    }

    //gesture
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

       
    };


    //add happiness when GIF is pressed
    const addHappy = () => {

        setPetHappy((currentHappy) => Math.min(currentHappy + 10, 100)); // add 10 to happiness cap it at 100
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

            setTimeout(() => {

                setGorillaAlive(false); // gorilla is dead 

            }, 2000); // 2 seconds wait
            
            
        } else if ( petHappy <= 50) {

            setImage(gorillaMad); // Change image to gorilla mad

        } 

    }, [petHappy]);// petHappy chnages



    //play angry sound when petHappy reaches 50
    useEffect(() => {

        if (petHappy <= 50) {

            loadSound();
            playPBO();

        } else {
            
            unloadPBO();// unload if goes above 50
        }
    }, [petHappy]); // petHappy changes



  
    //revive when revive gorilla is pressed

    const reviveG = () => {

        setPetHappy(100);
        setGorillaAlive(true);
        setImage(gorillaWel);

    };

  

  //save state inspired from Stephen's expo example

 /**
 * This function will load a json string of all the saved data 
 * We assume that the file is good
 * We assume that all the required object parts are present
 */
    const loadState = async () => {
        try {
            // get the string
            const currentStateString = await FileSystem.readAsStringAsync(
                FileSystem.documentDirectory + fileName
            );
            // convert it to an object
            currentState = JSON.parse(currentStateString)
            // extract all the saved states
            setPetHappy(currentState.happy);
            setImage(currentState.image);
        } catch (e) {
            console.log(FileSystem.documentDirectory + fileName + e);
            // probably there wasn't a saved state, so make one for next time?
            saveState();
        }
    }

    /**
     * This function will save the data as a json string 
     */
    const saveState = async () => {
        // build an object of everything we are saving
        const currentState = { "happy": petHappy, "image": image };

        try {
            // write the stringified object to the save file
            await FileSystem.writeAsStringAsync(
                FileSystem.documentDirectory + fileName,
                JSON.stringify(currentState)
            );

            //alert state saved successfully
            Alert.alert('Success', 'State saved successfully!');
        } catch (e) {
            console.log(FileSystem.documentDirectory + fileName + e);
        }
    }


    // This effect hook will load the state, sound and unload when closed
    useEffect(() => {

        loadState();
        loadSound();

        return () => {
            unloadPBO(); // unload the sound on component unmount
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

         

            {gorillaAlive ? (
                <View>
                    <Text style={Styles.textW}>Happiness: {petHappy}</Text>

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
                                            style={Styles.pet}
                                        />
                                    </Pressable>

                                </Animated.View>
                            </GestureDetector>
                        </View>
                    </GestureHandlerRootView>
                </View>
            ) : (
                <View style={Styles.page}>
                    <Text style={{ fontSize: 20 }}>Gorilla Passed away! :( </Text>

                    <Text style={{ fontSize: 20 }}>Rest in Peace</Text>

                    <Text style={{ fontSize: 20 }}>Dont worry you can bring him back </Text>

                    <Pressable
                        style={Styles.button}
                        onPress={reviveG}
                    >
                        <Text style={{ fontSize: 20 }}>Revive Gorilla</Text>
                    </Pressable>
                </View>
            )}

            

            <Pressable
                style={Styles.button}
                onPress={saveState}
            >
                <Text style={{ fontSize: 20 }}>Save State</Text>
            </Pressable>
                
                
             

            
         </View>



          
        
    );
}

    