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

        

        <Text style={Styles.header}> Assignment 4</Text>


        <Text style={Styles.textW}> Welcome to my DigiPet</Text>

        <Text style={Styles.text1}> How to play</Text>

        <Text style={Styles.text2}> Click CIT Kong to start</Text>

        <Text style={Styles.text2}> Meet your pet Kong</Text>

        <Text style={Styles.text2}> Kong starts in Happy mode  </Text>

        <Text style={Styles.text2}>Keep eye on Happiness, Tap him to make him happy </Text>

        <Text style={Styles.text2}> With 5 sec wait Happiness goies down, he becomes Angry Kong</Text>

        <Text style={Styles.text2}> Roars and vibrates your phone </Text>

        <Text style={Styles.text2}>Don't be scared Tap him to make him Happy</Text>

        <Text style={Styles.text2}>He will die if Happiness is 0</Text>

        <Text style={Styles.text2}>You will be able to revive him </Text>

        <Text style={Styles.text2}>To save click Save State</Text>

        
        <Text style={Styles.text2}>ENJOY</Text>

        


        <View>
        
        

       
            <Link
                style={Styles.button}
                href={{
                    pathname: "/page",
                    
                }} asChild >

                <Pressable>
                    
                    <Text style={{ fontSize: 20 } }>CIT KONG</Text> 
                </Pressable>

            </Link>

           

        </View>



    </View>
    
    )

}
//this git having problem