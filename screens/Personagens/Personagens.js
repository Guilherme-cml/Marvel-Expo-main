// c:/Users/aliss/Downloads/Marvel-Expo-main/Marvel-Expo-main/screens/Personagens/Personagens.js


import { View, StyleSheet, FlatList, Text, Animated, Easing } from 'react-native';
import { Card, Searchbar } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import Api from '../../services/Api';
import { useFonts } from 'expo-font';

export default function Personagens({ navigation }) {
  const [fontsLoaded] = useFonts({
    'Adventure': require('../../assets/fonts/Adventure.otf'),
  },);

  const [personagens, setPersonagens] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const img_default = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';


  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    Api.get('characters')
      .then(response => {
        const respostaPersonagens = response.data.data.results
        const personagensFiltrados = respostaPersonagens.filter(p => !(p.thumbnail.path + '.' + p.thumbnail.extension == img_default))
        setPersonagens(personagensFiltrados);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setLoading(false);
      });
  }

  const loadMoreData = () => {
    setLoading(true);
    Api.get('characters?offset=' + offset)
      .then(response => {
        const respostaPersonagens = response.data.data.results
        const personagensFiltrados = respostaPersonagens.filter(p => !(p.thumbnail.path + '.' + p.thumbnail.extension == img_default))
        setPersonagens([...personagens, ...personagensFiltrados]);
        setOffset(offset + 100);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading more data:', error);
        setLoading(false);
      });
  }

  const [pesquisar, setPesquisar] = useState('');

  const handlePesquisar = () => {
    setLoading(true);
    Api.get(`characters?nameStartsWith=${pesquisar}`)
      .then(response => {
        const respostaPersonagens = response.data.data.results
        const personagensFiltrados = respostaPersonagens.filter(p => !(p.thumbnail.path + '.' + p.thumbnail.extension == img_default))
        setPersonagens(personagensFiltrados);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error searching data:', error);
        setLoading(false);
      });
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#700f14' }}>
      <Animated.Text style={[styles.text]}>Personagens</Animated.Text>
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
          <Animated.Text style={[styles.loadingText]}>Loading...</Animated.Text>
        </View>
      )}
      <FlatList
        style={styles.container}
        data={personagens}
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
            onPress={() => navigation.push('personagens-detalhes', { id: item.id })}
          >
            <Card.Cover style={{ width: 100, height: 150, borderRadius: -10 }} source={{ uri: item.thumbnail.path + '.' + item.thumbnail.extension }} />
            <Card.Content>
              <Text style={{ marginTop: 5 }}>{item.name}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  )
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
  }
});