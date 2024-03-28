/**
 * Assignment 4: Digi Pet
 * 
 * Author: Rajan Chaudhari 
 * 
 * date: 2024-03-20
 */

/**
 * Inspired by
 * 
 * Stephen Graham's in class examples,
 * 
 * Reanimated lib
 * 
 * Gorilla GIF from - https://www.gifs.cc/animals.html
 * 
 * Gorilla Moving GIF - https://www.wilsoninfo.com/animals.htm
 * 
 * Gorilla Wel GIF from - http://gifgifs.com/split/2830/
 * 
 * Gorilla dying from - https://www.freepik.com/free-vector/scene-with-monkey-dying-drought-land_5875389.htm
 * 
 * Gorilla angry sound from - https://pixabay.com/sound-effects/search/gorilla/
 * 
 * splash screen from - https://www.vecteezy.com/vector-art/11648904-rc-monogram-initial-logo-with-shield-and-crown-style
 */


//index.js

import React, { useState} from 'react';
import { Alert,Pressable, Text, TextInput,  View } from 'react-native';
import { Link } from 'expo-router';
import Styles from '../styles/page-styles';


export default function Page() {


    

return (
    <View style={Styles.page} >

        

        <Text style={Styles.header}> Assignment 3</Text>


        <Text style={Styles.textW}> Welcome to my Soundboard</Text>

        <Text style={Styles.text1}> How to play</Text>

        <Text style={Styles.text2}> Click Sound to start</Text>

        <Text style={Styles.text2}> 3 buttons on top play pre programmed sound</Text>

        <Text style={Styles.text2}> You can also Record you own sound </Text>

        <Text style={Styles.text2}>Give your permission to use microphone  </Text>

        <Text style={Styles.text2}> Click Start Recording to record your sound </Text>

        <Text style={Styles.text2}> record Upto 4 recordings</Text>

        <Text style={Styles.text2}>Click clear to erase your recordings</Text>

        <Text style={Styles.text2}>ENJOY</Text>

        


        <View>
        
        

       
            <Link
                style={Styles.button}
                href={{
                    pathname: "/page",
                    
                }} asChild >

                <Pressable>
                    
                    <Text style={{ fontSize: 20 } }>Sounds</Text> 
                </Pressable>

            </Link>

           

        </View>



    </View>
    
    )

}
//this git having problem