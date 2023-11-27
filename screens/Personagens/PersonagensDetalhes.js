// c:/Users/aliss/Downloads/Marvel-Expo-main/Marvel-Expo-main/screens/Personagens/PersonagensDetalhes.js

// import { StyleSheet, Text, View, Image } from 'react-native'
// import React, { useEffect, useState} from 'react'
// import Api from '../../services/Api'

// export default function PersonagensDetalhes({route}) {

//   const [personagens, setPersonagens] = useState({})
  
//   useEffect(() => {
//     const id = route.params.id
//     Api.get(`characters/${id}`)
//       .then(response => {
//         setPersonagens(response.data.data.results)
//       })
//     })
  
//   console.log(personagens)
  
//   return (
//     <View>
//       <Image source={{uri: personagens.thumbnail.path + '.' + personagens.thumbnail.extension}}/>
//       <Text style={styles.text}>{personagens.name}dfesfsef</Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   text: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginTop: 20, 
    
//   }
// })

import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Api from '../../services/Api';

export default function PersonagensDetalhes({ route }) {
  const [characterDetails, setCharacterDetails] = useState([]);

  useEffect(() => {
    const id = route.params.id;
    Api.get(`characters/${id}`)
      .then(response => {
        setCharacterDetails(response.data.data.results);
      })
      .catch(error => {
        console.error('Error loading character details:', error);
      });
  }, [route.params.id]);

  return (
    <View>
      <FlatList
        data={characterDetails}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View key={item.id}>
            <Image source={{ uri: item.thumbnail.path + '.' + item.thumbnail.extension }}
              style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 100 }} 
            />
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.description}</Text>
            { item.comics && (
              <Text style={styles.text}>Comics: {item.comics.available}</Text>
            )}
            { item.series && (
              <Text style={styles.text}>Series: {item.series.available}</Text>
            )}
            { item.stories && (
              <Text style={styles.text}>Stories: {item.stories.available}</Text>
            )}
            { item.events && (
              <Text style={styles.text}>Events: {item.events.available}</Text>
            )}
          </View>
        )}
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontFamily: 'Adventure',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});