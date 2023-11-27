// // c:/Users/aliss/Downloads/Marvel-Expo-main/Marvel-Expo-main/screens/Quadrinhos/Quadrinhos.js

// import { View, StyleSheet, FlatList } from 'react-native'
// import { ActivityIndicator, Card, Searchbar, Text } from 'react-native-paper'
// import React, { useEffect, useState } from 'react'
// import Api from '../../services/Api'
// import { useFonts } from 'expo-font'

// export default function Quadrinhos({ navigation }) {

//   const [fontsLoaded] = useFonts({
//     'Adventure': require('../../assets/fonts/Adventure.otf'),
//   })

//     const [quadrinhos, setQuadrinhos] = useState([])
//     const [offset, setOffset] = useState(100)
//     const [loading, setLoading] = useState(false)
    
//     const img_default = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    
//     // loading = false
    
//     useEffect(() => {
//       loadData()
//     }, [])
    
//     const loadData = () => {
//       // setLoading(true)
//       Api.get('comics')
//       .then(response => {
//         const respostaQuadrinhos = response.data.data.results
//         const quadrinhosFiltrados = respostaQuadrinhos.filter(p => !(p.thumbnail.path + '.' + p.thumbnail.extension == img_default))
//         setQuadrinhos(quadrinhosFiltrados)
//           // setLoading(false)
//         })
//     }

//     const loadMoreData = () => {
//       setLoading(true)
//       Api.get('comics?offset=' + offset)
//         .then(response => {
//           const respostaQuadrinhos = response.data.data.results
//           const quadrinhosFiltrados = respostaQuadrinhos.filter(p => !(p.thumbnail.path + '.' + p.thumbnail.extension == img_default))
//           setQuadrinhos([...quadrinhos, ...quadrinhosFiltrados])
//           setOffset(offset + 100)
//           setLoading(false)
  
//         })
//     }

//     const [pesquisar, setPesquisar] = useState('')
//     const handlePesquisar = () => {
//         Api.get(`comics?titleStartsWith=${pesquisar}`)
//         .then(response => {
//           const respostaQuadrinhos = response.data.data.results
//         const quadrinhosFiltrados = respostaQuadrinhos.filter(p => !(p.thumbnail.path + '.' + p.thumbnail.extension == img_default))
//           setQuadrinhos(quadrinhosFiltrados)
//         })
//     }

    
//   return (
//     <View style={{ flex: 1 , backgroundColor: '#700f14' }}>
//           <Text style={styles.text}>Quadrinhos</Text>
//           <Searchbar style={styles.search} 
//                  theme={{colors:{ primary: 'white'}}} 
//                  iconColor="white"
//                  placeholder="Pesquisar" 
//                  placeholderTextColor="white" 
//                  inputStyle={{color: 'white'}} 
//                  onChangeText={value => setPesquisar(value)} 
//                  value={pesquisar} 
//                  onIconPress={handlePesquisar}
//                  onSubmitEditing={handlePesquisar}
//                  onClearIconPress={() => {
//                   setPesquisar('');
//                   loadData();
//                  }}
//                  />
      
//       <FlatList style={styles.container}
//         data={quadrinhos}
//         numColumns={3}
//         showsVerticalScrollIndicator={false}
//         keyExtractor={item => item.id}
//         onEndReached={loadMoreData}
//         columnWrapperStyle={{justifyContent: 'space-evenly'}}
//         ListFooterComponent={loading  && <ActivityIndicator theme={{ colors: { primary: 'red' } }} style={{ backgroundColor: '#fff', marginBottom: 10}} animating={true} />}
//         onEndReachedThreshold={0.1}
//         renderItem={({item}) => (
//         <Card 
//         key={item.id}
//         style={styles.card}
//         mode="contained"
//         onPress={() => navigation.push('quadrinhos-detalhes', {id: item.id})}
//       >
//        <Card.Cover style={{width: 100, height: 150, borderRadius: -10}} source={{uri: item.thumbnail.path + '.' + item.thumbnail.extension}} />
//         <Card.Content>
//           <Text style={{marginTop: 5}}>{item.title}</Text>
//         </Card.Content>
//        </Card>
//         )}>
//       </FlatList>
    
// </View> 
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//   },
//   viewContainer:{
//     backgroundColor: '#fff',
//     marginEnd: 10,
//   },
//   text: {
//     fontFamily: 'Adventure',
//     fontSize: 30, 
//     textAlign: 'center', 
//     marginBottom: 10,
//     marginTop: 50, 
//     color: 'white'
//   },
//   card: {
//     marginBottom: 120,
//     width: 100,
//     height: 100,
//     margin: 5,
//     borderRadius: -10,
//   },
//   search: {
//     marginLeft: 10,
//     marginRight: 10,
//     marginBottom: 10,
//     backgroundColor: 'black',
//   }
  
// })





// c:/Users/aliss/Downloads/Marvel-Expo-main/Marvel-Expo-main/screens/Quadrinhos/Quadrinhos.js

import { View, StyleSheet, FlatList, Animated, Easing } from 'react-native';
import { ActivityIndicator, Card, Searchbar, Text } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import Api from '../../services/Api';
import { useFonts } from 'expo-font';

export default function Quadrinhos({ navigation }) {
  const [fontsLoaded] = useFonts({
    'Adventure': require('../../assets/fonts/Adventure.otf'),
  });

  const [quadrinhos, setQuadrinhos] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const img_default = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    loadData();
    startSwingingAnimation();
  }, []);

  const loadData = () => {
    setLoading(true);
    Api.get('comics')
      .then(response => {
        const respostaQuadrinhos = response.data.data.results;
        const quadrinhosFiltrados = respostaQuadrinhos.filter(p => !(p.thumbnail.path + '.' + p.thumbnail.extension == img_default));
        setQuadrinhos(quadrinhosFiltrados);
      })
      .finally(() => setLoading(false));
  };

  const loadMoreData = () => {
    setLoading(true);
    Api.get('comics?offset=' + offset)
      .then(response => {
        const respostaQuadrinhos = response.data.data.results;
        const quadrinhosFiltrados = respostaQuadrinhos.filter(p => !(p.thumbnail.path + '.' + p.thumbnail.extension == img_default));
        setQuadrinhos([...quadrinhos, ...quadrinhosFiltrados]);
        setOffset(offset + 100);
      })
      .finally(() => setLoading(false));
  };

  const [pesquisar, setPesquisar] = useState('');

  const handlePesquisar = () => {
    setLoading(true);
    Api.get(`comics?titleStartsWith=${pesquisar}`)
      .then(response => {
        const respostaQuadrinhos = response.data.data.results;
        const quadrinhosFiltrados = respostaQuadrinhos.filter(p => !(p.thumbnail.path + '.' + p.thumbnail.extension == img_default));
        setQuadrinhos(quadrinhosFiltrados);
      })
      .finally(() => setLoading(false));
  };

  const startSwingingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const swingingAnimationStyle = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 20],
        }),
      },
    ],
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#700f14' }}>
      <Animated.Text style={[styles.text, swingingAnimationStyle]}>Quadrinhos</Animated.Text>
      <Searchbar
        style={styles.search}
        theme={{ colors: { primary: 'white' } }}
        iconColor="white"
        placeholder="Pesquisar"
        placeholderTextColor="white"
        inputStyle={{ color: 'white' }}
        onChangeText={value => setPesquisar(value)}
        value={pesquisar}
        onIconPress={handlePesquisar}
        onSubmitEditing={handlePesquisar}
        onClearIconPress={() => {
          setPesquisar('');
          loadData();
        }}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          {/* You can use a different animation or loader here */}
          <Animated.Text style={[styles.loadingText, swingingAnimationStyle]}>Loading...</Animated.Text>
        </View>
      )}
      <FlatList
        style={styles.container}
        data={quadrinhos}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        onEndReached={loadMoreData}
        columnWrapperStyle={{ justifyContent: 'space-evenly' }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <Text style={styles.loadingText}>Loading more...</Text>}
        renderItem={({ item }) => (
          <Card
            key={item.id}
            style={styles.card}
            mode="contained"
            onPress={() => navigation.push('quadrinhos-detalhes', { id: item.id })}
          >
            <Card.Cover style={{ width: 100, height: 150, borderRadius: -10 }} source={{ uri: item.thumbnail.path + '.' + item.thumbnail.extension }} />
            <Card.Content>
              <Text style={{ marginTop: 5 }}>{item.title}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  text: {
    fontFamily: 'Adventure',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 50,
    color: 'white',
  },
  loadingText: {
    fontFamily: 'Adventure',
    fontSize: 40,
    color: 'white',
  },
  card: {
    marginBottom: 120,
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: -10,
  },
  search: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: 'black',
  },
});