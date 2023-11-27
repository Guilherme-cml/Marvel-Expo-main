// import { StyleSheet, Text, View, Image } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import Api from '../../services/Api';

// export default function QuadrinhosDetalhes({ route }) {
//   const [quadrinhos, setQuadrinhos] = useState({});

//   useEffect(() => {
//     const id = route.params.id;
//     Api.get(`comics/${id}`)
//       .then(response => {
//         setQuadrinhos(response.data.data.results[0]);
//       })
//       .catch(error => {
//         console.error('Error loading comic details:', error);
//       });
//   }, [route.params.id]);

//   console.log(quadrinhos);

//   if (!quadrinhos.thumbnail || !quadrinhos.thumbnail.path) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <View>
//       <Image
//         source={{ uri: quadrinhos.thumbnail.path + '.' + quadrinhos.thumbnail.extension }}
//         style={{ width: 400, height: 600, alignSelf: 'center', marginTop: 100 }}
//       />
//       <Text style={styles.text}>{quadrinhos.title}</Text>
//       <Text style={styles.text}>{quadrinhos.description}</Text>
//       <Text style={styles.text}> Pages: {quadrinhos.pageCount}</Text>
      
//       {/* Displaying prices (if available) */}
//       {quadrinhos.prices && quadrinhos.prices.length > 0 && (
//         <Text style={styles.text }> Price: {quadrinhos.prices[0].price}</Text>
//       )}
      
//       {/* Displaying series (if available) */}
//       {quadrinhos.series && (
//         <Text style={styles.text }>Series: {quadrinhos.series.name}</Text>
//       )}
      
//       {/* Displaying creators (if available) */}
//       {quadrinhos.creators && quadrinhos.creators.items && quadrinhos.creators.items.length > 0 && (
//         <Text style={styles.text }>Creators: {quadrinhos.creators.items[0].name}</Text>
//       )} 
//       {/* Add more details you want to display */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   text: {
//     color: 'black',
//     fontFamily: 'Adventure',
//     fontWeight: 'bold',
//     fontSize: 18,
//     marginTop: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, FlatList } from 'react-native';
import Api from '../../services/Api';

export default function QuadrinhosDetalhes({ route }) {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const id = route.params.id;
    Api.get(`comics/${id}`)
      .then(response => {
        setComics([response.data.data.results[0]]);
      })
      .catch(error => {
        console.error('Error loading comic details:', error);
      });
  }, [route.params.id]);

  console.log(comics);

  if (comics.length === 0 || !comics[0].thumbnail || !comics[0].thumbnail.path) {
    return <Text>Loading...</Text>;
  }

  const renderItem = ({ item }) => (
    <View>
      <Image
        source={{ uri: item.thumbnail.path + '.' + item.thumbnail.extension }}
        style={{ width: 400, height: 600, alignSelf: 'center', marginTop: 100 }}
      />
      <Text style={styles.text}>{item.title}</Text>
      <Text style={styles.text}>{item.description}</Text>
      <Text style={styles.text}> Pages: {item.pageCount}</Text>

      {/* Displaying prices (if available) */}
      {item.prices && item.prices.length > 0 && (
        <Text style={styles.text}> Price: {item.prices[0].price}</Text>
      )}

      {/* Displaying series (if available) */}
      {item.series && (
        <Text style={styles.text}>Series: {item.series.name}</Text>
      )}

      {/* Displaying creators (if available) */}
      {item.creators && item.creators.items && item.creators.items.length > 0 && (
        <Text style={styles.text}>Creators: {item.creators.items[0].name}</Text>
      )}
    </View>
  );

  return (
    <FlatList
      data={comics}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontFamily: 'Adventure',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
});