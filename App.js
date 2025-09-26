import React, {useState, useEffect, use} from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Image } from 'react-native'; 
import { Gyroscope } from 'expo-sensors';
import frutas from './frutas.json';
import filmes from './filmes.json';
import animais from './animais.json';

const obterCorAleatória = (corAtual) => {
  const cores = ['#FF5733', '#33FF57', '#3357FF', '#FF8C00', '#FF33F6',  '#006400','#008080', '#0000CD', '#4b0082'];
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
  //Temporizador
  const [tempo, definirTempo] = useState(20);
  const [temporizadorAtivo, definirTemporizadorAtivo] = useState(false);
  const [intervalo, setIntervalo] = useState(null);

  let ultimaTroca = Date.now();

  useEffect(() => {
    if (permiteSensor && modoSelecionado) {
      if(modoSelecionado === 'frutas') {
      sortearFrutas();
      iniciarFrutas();
    } else if(modoSelecionado === 'filmes') {
      sortearFilmes();
      iniciarFilmes();  
    } else if (modoSelecionado === 'animais') {
      sortearAnimais();
      iniciarAnimais();
    }

    const intervaloID = setIntervalo(() => {
    definirTempo((prevTempo) => {
      if (prevTempo <= 1) {
        clearInterval(intervaloID);
        return 0;
    }
    return prevTempo - 1;
    });
  }, 1000);
  return () => {
    clearInterval(intervaloID); 
  }
}
}, [permiteSensor, modoSelecionado, temporizadorAtivo]);

//Frutas
  const iniciarFrutas = () => {
    Gyroscope.setUpdateInterval(100);
    definirInscricao(
      Gyroscope.addListener (({x, y, z}) => {
        const agora = Date.now();

        console.log(`Movimento detectado: x=${x.toFixed(2)}, y=${y.toFixed(2)}, z=${z.toFixed(2)}`);

        if (z < -2 && agora - ultimaTroca > 250) {
          ultimaTroca = agora;

          const item = frutas[Math.floor(Math.random() * frutas.length)];
          const palavra = Object.keys(item)[0];
           const url = item[palavra]
          const novaCorTexto = corTexto === '#000000' ? '#FFFFFF' : '#000000';
          const novaCorFundo = obterCorAleatória(corFundo);

          definirPalavra(palavra);
          definirUrlImagem(url)
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
    const url = item[palavra]
    const novaCorTexto = corTexto === '#000000' ? '#FFFFFF' : '#000000';
    const novaCorFundo = obterCorAleatória(corFundo);

    definirPalavra(palavra);
    definirUrlImagem(url);
    definirCorTexto(novaCorTexto);
    definirCorFundo(novaCorFundo);
    definirTempo(20);
  }


  const  pararSensor = () => {
    inscricao && inscricao.remove();
    definirInscricao(null);
  };


//Filmes
  const iniciarFilmes = () => {
    Gyroscope.setUpdateInterval(100);
    definirInscricao(
      Gyroscope.addListener (({x, y, z}) => {
        const agora = Date.now();

        console.log(`Movimento detectado: x=${x.toFixed(2)}, y=${y.toFixed(2)}, z=${z.toFixed(2)}`);

        if (z < -2 && agora - ultimaTroca > 250) {
          ultimaTroca = agora;

          const item = filmes[Math.floor(Math.random() * filmes.length)];
          const palavra = Object.keys(item)[0];
           const url = item[palavra]
          const novaCorTexto = corTexto === '#000000' ? '#FFFFFF' : '#000000';
          const novaCorFundo = obterCorAleatória(corFundo);

          definirPalavra(palavra);
          definirUrlImagem(url)
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
    const url = item[palavra]
    const novaCorTexto = corTexto === '#000000' ? '#FFFFFF' : '#000000';
    const novaCorFundo = obterCorAleatória(corFundo);

    definirPalavra(palavra);
    definirUrlImagem(url);
    definirCorTexto(novaCorTexto);
    definirCorFundo(novaCorFundo);
    definirTempo(20);
  }

  
//Animais
  const iniciarAnimais = () => {
    Gyroscope.setUpdateInterval(100);
    definirInscricao(
      Gyroscope.addListener (({x, y, z}) => {
        const agora = Date.now();

        console.log(`Movimento detectado: x=${x.toFixed(2)}, y=${y.toFixed(2)}, z=${z.toFixed(2)}`);

        if (z < -2 && agora - ultimaTroca > 250) {
          ultimaTroca = agora;

          const item = animais[Math.floor(Math.random() * animais.length)];
           const url = item[palavra]
          const palavra = Object.keys(item)[0];
          const novaCorTexto = corTexto === '#000000' ? '#FFFFFF' : '#000000';
          const novaCorFundo = obterCorAleatória(corFundo);

          definirPalavra(palavra);
          definirUrlImagem(url)
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
    const url = item[palavra]
    const novaCorTexto = corTexto === '#000000' ? '#FFFFFF' : '#000000';
    const novaCorFundo = obterCorAleatória(corFundo);

    definirPalavra(palavra);
    definirUrlImagem(url);
    definirCorTexto(novaCorTexto);
    definirCorFundo(novaCorFundo);
    definirTempo(20);
  }


  //Tela inicial e permissão
  const renderTelaInicial = () => (
    <View atyle={[estilos.tela, {backgroundColor: '#FFFFFF'}]}> 
      <Text style={estilos.titulo}>Adivinha quem sou?</Text>
      <Text style={estilos.instrucao}>Agite levemente o celular para trocar de palavra</Text>
      <TouchableOpacity style={estilos.botao} onPress={() => definirTelaInicial(false)}> 
        <Text style={estilos.textoBotao}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPermissao = () => (
    <View style={[estilos.tela, {backgroundColor: '#FFFFFF'}]}> 
      <Text style={estilos.titulo}>Permitir uso do giroscópio?</Text>
      <TouchableOpacity style={estilos.botao} onPress={() => definirPermiteSensor(true)}> 
        <Text style={estilos.textoBotao}>Permitir</Text>
      </TouchableOpacity>
    </View>
  );

  //Para selecionar o modo de jogo

  const selecionarModo = (modo) => {
    definirModoSelecionado(modo);
    definirTelaInicial(false);
    definirPermiteSensor(true);
    definirTemporizadorAtivo(true);
    definirTempo(20); 
  }

  const renderModoSelecao = () => (
    <View style={[estilos.tela, {backgroundColor: '#FFFFFF'}]}> 
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
    <View style={[estilos.tela, {backgroundColor: corFundo}]}> 
    <Text style={estilos.temporizador}>
  Tempo: {tempo}
</Text>
    {urlImagem &&(
      <Image
      key={urlImagem} 
      source={{uri: urlImagem}} 
      style={estilos.imagem} 
      resizeMode="contain" />
    )}
      <Text style={[estilos.palavra, {color: corTexto}]}>{palavra}</Text>

      <TouchableOpacity style={estilos.botao} onPress={() =>{definirTelaInicial(true)
        definirPermiteSensor(false)
        definirModoSelecionado(null);
        definirTemporizadorAtivo(false);
        definirTempo(20);
        pararSensor()
      }
      }> 
        <Text style={estilos.textoBotao}>Voltar ao Menu</Text>  
      </TouchableOpacity>
      
    </View>
  )

  if(telaInicial) return renderTelaInicial();
  if(!modoSelecionado) return renderModoSelecao();
  if(!permiteSensor) return renderPermissao();
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
    color:'#000',
  }
});