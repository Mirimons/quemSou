import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { Audio } from 'expo-av'; // 👈 import para o áudio
import frutas from './frutas.json';
import filmes from './filmes.json';
import animais from './animais.json';

const obterCorAleatória = (corAtual) => {
  const cores = ['#FF5733', '#33FF57', '#3357FF', '#FF8C00', '#FF33F6', '#006400', '#008080', '#0000CD', '#4b0082'];
  const outrasCores = cores.filter(cor => cor !== corAtual);
  return outrasCores[Math.floor(Math.random() * outrasCores.length)];
};

export default function App() {
  const [palavra, definirPalavra] = useState('');
  const [urlImagem, definirUrlImagem] = useState(null);
  const [corFundo, definirCorFundo] = useState('#FFFFFF');
  const [corTexto, definirCorTexto] = useState('#000000');
  const [inscricao, definirInscricao] = useState(null);
  const [telaInicial, definirTelaInicial] = useState(true);
  const [permiteSensor, definirPermiteSensor] = useState(false);
  const [modoSelecionado, definirModoSelecionado] = useState(null);
  const [tempo, definirTempo] = useState(20);
  const [temporizadorAtivo, definirTemporizadorAtivo] = useState(false);

  let ultimaTroca = Date.now();
  const intervaloRef = useRef(null);
  const soundRef = useRef(null); // 👈 referência do som

  // 🎶 Função para tocar música
  const tocarMusica = async () => {
    if (!soundRef.current) {
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/ost.mp3'), // coloque o arquivo em assets
        { isLooping: true, volume: 0.5 }
      );
      soundRef.current = sound;
      await sound.playAsync();
    }
  };

  // 🎶 Função para parar música
  const pararMusica = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
  };

  // useEffect do temporizador
  useEffect(() => {
    if (temporizadorAtivo && permiteSensor && modoSelecionado) {
      intervaloRef.current = setInterval(() => {
        definirTempo((prevTempo) => {
          if (prevTempo <= 1) {
            clearInterval(intervaloRef.current);
            return 0;
          }
          return prevTempo - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
      }
    };
  }, [temporizadorAtivo, permiteSensor, modoSelecionado]);

  // --------- FRUTAS ----------
  const iniciarFrutas = () => {
    Gyroscope.setUpdateInterval(100);
    definirInscricao(
      Gyroscope.addListener(({ x, y, z }) => {
        const agora = Date.now();
        if (z < -2 && agora - ultimaTroca > 250) {
          ultimaTroca = agora;
          const item = frutas[Math.floor(Math.random() * frutas.length)];
          const palavra = Object.keys(item)[0];
          const url = item[palavra];
          const novaCorTexto = corTexto === '#000000' ? '#FFFFFF' : '#000000';
          const novaCorFundo = obterCorAleatória(corFundo);

          definirPalavra(palavra);
          definirUrlImagem(url);
          definirCorTexto(novaCorTexto);
          definirCorFundo(novaCorFundo);
          definirTempo(20);
        }
      })
    );
  };

  const sortearFrutas = () => {
    const item = frutas[Math.floor(Math.random() * frutas.length)];
    const palavra = Object.keys(item)[0];
    const url = item[palavra];
    const novaCorTexto = corTexto === '#000000' ? '#FFFFFF' : '#000000';
    const novaCorFundo = obterCorAleatória(corFundo);

    definirPalavra(palavra);
    definirUrlImagem(url);
    definirCorTexto(novaCorTexto);
    definirCorFundo(novaCorFundo);
    definirTempo(20);
  };

  // --------- FILMES ----------
  const iniciarFilmes = () => {
    Gyroscope.setUpdateInterval(100);
    definirInscricao(
      Gyroscope.addListener(({ x, y, z }) => {
        const agora = Date.now();
        if (z < -2 && agora - ultimaTroca > 250) {
          ultimaTroca = agora;
          const item = filmes[Math.floor(Math.random() * filmes.length)];
          const palavra = Object.keys(item)[0];
          const url = item[palavra];
          const novaCorTexto = corTexto === '#000000' ? '#FFFFFF' : '#000000';
          const novaCorFundo = obterCorAleatória(corFundo);

          definirPalavra(palavra);
          definirUrlImagem(url);
          definirCorTexto(novaCorTexto);
          definirCorFundo(novaCorFundo);
          definirTempo(20);
        }
      })
    );
  };

  const sortearFilmes = () => {
    const item = filmes[Math.floor(Math.random() * filmes.length)];
    const palavra = Object.keys(item)[0];
    const url = item[palavra];
    const novaCorTexto = corTexto === '#000000' ? '#FFFFFF' : '#000000';
    const novaCorFundo = obterCorAleatória(corFundo);

    definirPalavra(palavra);
    definirUrlImagem(url);
    definirCorTexto(novaCorTexto);
    definirCorFundo(novaCorFundo);
    definirTempo(20);
  };

  // --------- ANIMAIS ----------
  const iniciarAnimais = () => {
    Gyroscope.setUpdateInterval(100);
    definirInscricao(
      Gyroscope.addListener(({ x, y, z }) => {
        const agora = Date.now();
        if (z < -2 && agora - ultimaTroca > 250) {
          ultimaTroca = agora;
          const item = animais[Math.floor(Math.random() * animais.length)];
          const palavra = Object.keys(item)[0];
          const url = item[palavra];
          const novaCorTexto = corTexto === '#000000' ? '#FFFFFF' : '#000000';
          const novaCorFundo = obterCorAleatória(corFundo);

          definirPalavra(palavra);
          definirUrlImagem(url);
          definirCorTexto(novaCorTexto);
          definirCorFundo(novaCorFundo);
          definirTempo(20);
        }
      })
    );
  };

  const sortearAnimais = () => {
    const item = animais[Math.floor(Math.random() * animais.length)];
    const palavra = Object.keys(item)[0];
    const url = item[palavra];
    const novaCorTexto = corTexto === '#000000' ? '#FFFFFF' : '#000000';
    const novaCorFundo = obterCorAleatória(corFundo);

    definirPalavra(palavra);
    definirUrlImagem(url);
    definirCorTexto(novaCorTexto);
    definirCorFundo(novaCorFundo);
    definirTempo(20);
  };

  const pararSensor = () => {
    inscricao && inscricao.remove();
    definirInscricao(null);
  };

  // --------- TELAS ----------
  const renderTelaInicial = () => (
    <View style={[estilos.tela, { backgroundColor: '#FFFFFF' }]}>
      <Text style={estilos.titulo}>Adivinha quem sou?</Text>
      <Text style={estilos.instrucao}>Agite levemente o celular para trocar de palavra</Text>
      <TouchableOpacity style={estilos.botao} onPress={() => definirTelaInicial(false)}>
        <Text style={estilos.textoBotao}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPermissao = () => (
    <View style={[estilos.tela, { backgroundColor: '#FFFFFF' }]}>
      <Text style={estilos.titulo}>Permitir uso do giroscópio?</Text>
      <TouchableOpacity style={estilos.botao} onPress={() => definirPermiteSensor(true)}>
        <Text style={estilos.textoBotao}>Permitir</Text>
      </TouchableOpacity>
    </View>
  );

  const selecionarModo = (modo) => {
    definirModoSelecionado(modo);
    definirTelaInicial(false);
    definirPermiteSensor(true);
    definirTemporizadorAtivo(true);
    definirTempo(20);

    tocarMusica(); // 🎶 toca música só quando jogo inicia

    if (modo === 'frutas') { sortearFrutas(); iniciarFrutas(); }
    if (modo === 'filmes') { sortearFilmes(); iniciarFilmes(); }
    if (modo === 'animais') { sortearAnimais(); iniciarAnimais(); }
  };

  const renderModoSelecao = () => (
    <View style={[estilos.tela, { backgroundColor: '#FFFFFF' }]}>
      <Text style={estilos.titulo}>Selecione o modo de jogo</Text>
      <TouchableOpacity style={estilos.botao} onPress={() => selecionarModo('frutas')}>
        <Text style={estilos.textoBotao}>Frutas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={estilos.botao} onPress={() => selecionarModo('filmes')}>
        <Text style={estilos.textoBotao}>Filmes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={estilos.botao} onPress={() => selecionarModo('animais')}>
        <Text style={estilos.textoBotao}>Animais</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPalavra = () => (
    <View style={[estilos.tela, { backgroundColor: corFundo }]}>
      <Text style={estilos.temporizador}>Tempo: {tempo}</Text>
      {urlImagem && (
        <Image key={urlImagem} source={{ uri: urlImagem }} style={estilos.imagem} resizeMode="contain" />
      )}
      <Text style={[estilos.palavra, { color: corTexto }]}>{palavra}</Text>

      <TouchableOpacity
        style={estilos.botao}
        onPress={() => {
          definirTelaInicial(true);
          definirPermiteSensor(false);
          definirModoSelecionado(null);
          definirTemporizadorAtivo(false);
          definirTempo(20);
          pararSensor();
          pararMusica(); // 🎶 para música quando volta ao menu
        }}>
        <Text style={estilos.textoBotao}>Voltar ao Menu</Text>
      </TouchableOpacity>
    </View>
  );

  if (telaInicial) return renderTelaInicial();
  if (!modoSelecionado) return renderModoSelecao();
  if (!permiteSensor) return renderPermissao();
  return renderPalavra();
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  palavra: {
    fontSize: 80,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  instrucao: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
  botao: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 10,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagem: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  temporizador: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
});