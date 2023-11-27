import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-paper'
import React, { useState } from 'react'
import { useFonts } from 'expo-font'
import Pergunta from './Pergunta'

const perguntas = Pergunta
  

export default function Quiz() {

  const [fontsLoaded] = useFonts({
    'Adventure': require('../../assets/fonts/Adventure.otf'),
  })

  const [quizIniciado, setQuizIniciado] = useState(false);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(1);

  const iniciarQuiz = () => {
    setQuizIniciado(true);
  };

  const verificarResposta = (resposta) => {
    if (resposta === perguntas[perguntaAtual].respostaCorreta) {
      setPontuacao(pontuacao + 1);
    }

    const proximaPergunta = perguntaAtual + 1;
    if (proximaPergunta < perguntas.length) {
      setPerguntaAtual(proximaPergunta);
    } else {
      alert(`Quiz finalizado! Sua pontuação: ${pontuacao}`);
      setQuizIniciado(false);
      setPerguntaAtual(0);
      setPontuacao(0);
    }

}
  
  return (
    <View style={styles.container}>
      {quizIniciado ? ( 
        <>
        <Text style={styles.title}>Quiz</Text>
          <Text style={styles.pergunta}>{perguntas[perguntaAtual].pergunta}</Text>
          {perguntas[perguntaAtual].opcoes.map((opcao, index) => (
            <TouchableOpacity
              key={index}
              style={styles.opcao}
              onPress={() => verificarResposta(opcao)}
            >
              <Text>{opcao}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <TouchableOpacity style={styles.inicio} onPress={iniciarQuiz}>
          <Text style={styles.title}>Voce conhece tudo sobre o universo da Marvel?</Text>
          <Image source={require('../../assets/personagens.png')} style={{width: 360, height: 400}} />
          <Button mode="contained" style={styles.button}>Iniciar Quiz</Button>
          
        </TouchableOpacity>
        
      )}
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#700f14',
  },
  inicio: {
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontFamily: 'Adventure', 
    fontSize: 30, 
    textAlign: 'center', 
    marginTop: 70,
    marginBottom: 30 
  },
  button: { 
   width: 200,
   color: 'white',
   backgroundColor: 'black',
   borderRadius: 10,
   marginTop: 20
   
  },
  pergunta: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'Adventure',
    textAlign: 'center',
  },
  opcao: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
})