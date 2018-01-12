import React from 'react';
import { Component, AsyncStorage, Text, View, TextInput, Image, ScrollView} from 'react-native';
import styles from '../Styles/catPage'


export default class CatPage extends React.Component{
  render(){
    return(
      <View style={styles.container}>
      <ScrollView >
        <View style={styles.navContainer}>
        <Image source={require('../Assets/icon1.png')} style={styles.icons}/>
        <TextInput style={styles.textBox} underlineColorAndroid='transparent' placeholder='search'/>
        </View>
        <Image source={require('../Assets/cat1.jpg')} style={styles.photos}/>
        <Text style={styles.header}>Random Cat Facts</Text>
        <View style={styles.imageContainer}>
          <Image source={require('../Assets/cat2.jpg')} style={styles.smallPhotos}/>
          <Image source={require('../Assets/cat6.jpg')} style={styles.smallPhotos}/>
        </View>
        <Text style={styles.texts}>Unlike dogs, cats do not have a sweet tooth. 
          Scientists believe this is due to a mutation in a key taste receptor. 
          When a cat chases its prey, it keeps its head level. Dogs and humans bob 
          their heads up and down. Cats are North America’s most popular pets: 
          there are 73 million cats compared to 63 million dogs. Over 30% of 
          households in North America own a cat.
        </Text>
        <Text style={styles.header}>More Cat Facts</Text>
        <View style={styles.imageContainer}>
          <Image source={require('../Assets/cat4.jpeg')} style={styles.smallPhotos}/>
          <Image source={require('../Assets/cat5.jpg')} style={styles.smallPhotos}/>
        </View>
        <Text style={styles.texts}>A cat can travel at a top speed of approximately 
        31 mph (49 km) over a short distance. Most cats give birth to a litter of 
        between one and nine kittens. The largest known litter ever produced was 
        19 kittens, of which 15 survived. Cats have 32 muscles that control the outer 
        ear (humans have only 6). A cat can independently rotate its ears 180 degrees.
        </Text>
      </ScrollView >
      </View>
    );
  }
}