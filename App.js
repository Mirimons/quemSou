import React, {useState, useEffect, use} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'; 
import { Gyroscope } from 'expo-sensors';
import palavras from './palavras.json';

const obterCorAleatória = (corAtual) => {
  const cores = ['#FF5733', '#33FF57', '#3357FF', '#FF8C00', '#FF33F6',  '#006400','#008080', '#0000CD', '#4b0082'];
  const outrasCores = cores.filter(cor => cor !== corAtual);
  return outrasCores[Math.floor(Math.random() * outrasCores.length)];
};

export default function App() {
  const [palavra, definirPalavra] = useState('');
  const [corFundo, definirCorFundo] = useState('#FFFFFF');
  const [corTexto, definirCorTexto] = useState('#000000');
  const [inscricao, definirInscricao] = useState(null);
  const [telaInicial, definirTelaInicial] = useState(true);
  const [permiteSensor, definirPermiteSensor] = useState(false);

  let ultimaTroca = Date.now();

  useEffect(() => {
    if (permiteSensor) {
      sortearPalavra();
      iniciarSensor();
      return () => pararSensor();
    }
  }, [permiteSensor]);

  const iniciarSensor = () => {
    Gyroscope.setUpdateInterval(500);
    definirInscricao(
      Gyroscope.addListener (({x, y, z}) => {
        const agora = Date.now();

        console.log(`Movimento detectado: x=${x.toFixed(2)}, y=${y.toFixed(2)}, z=${z.toFixed(2)}`);

        if (z < -2 && agora - ultimaTroca > 1000) {
          ultimaTroca = agora;

          const novaPalavra = palavras[Math.floor(Math.random() * palavras.length)];
          const novaCorTexto = corTexto === '#000000' ? '#FFFFFF' : '#000000';
          const novaCorFundo = obterCorAleatória(corFundo);

          definirPalavra(novaPalavra);
          definirCorTexto(novaCorTexto);
          definirCorFundo(novaCorFundo);
         }
      })
    );
  };

  const  pararSensor = () => {
    inscricao && inscricao.remove();
    definirInscricao(null);
  };

  const sortearPalavra = () => {
    const novaPalavra = palavras[Math.floor(Math.random() * palavras.length)];
    const novaCorTexto = corTexto === '#000000' ? '#FFFFFF' : '#000000';
    const novaCorFundo = obterCorAleatória(corFundo);

    definirPalavra(novaPalavra);
    definirCorTexto(novaCorTexto);
    definirCorFundo(novaCorFundo);
  }
   
  const renderTelaInicial = () => (
    <View atyle={[estilos.tela, {backgroundColor: '#FFFFFF'}]}> 
      <Text style={estilos.titulo}>Adivinha quem sou?</Text>
      <Text style={estilos.instrucao}>Agite levemente o celular para trocar de palavra</Text>
      <Text style={estilos.instrucao}>Podemos jogar de duas formas diferentes:</Text>
      <Text style={estilos.instrucao}>1. Tentar descobrir por pistas, onde a pessoa passa estas pistas sem falar as palavras:</Text>
      <Text style={estilos.instrucao}>2. Tentar descobrir por mimicas, onde a pessoa irá imitar ou demonstrar sem falar as palavras:</Text>
      <Text style={estilos.instrucao}>O limite de tentativas ou tempo é definido pelos jogadores entre comum acordo. Divirtam-se!"</Text>

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

  const renderPalavra = () => (
    <View style={[estilos.tela, {backgroundColor: corFundo}]}> 
      <Text style={[estilos.palavra, {color: corTexto}]}>{palavra}</Text>
    </View>
  )

  if(telaInicial) return renderTelaInicial();
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
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});