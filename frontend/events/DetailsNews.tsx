import { LinearGradient } from 'expo-linear-gradient'
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Animated } from 'react-native'
import { ReceptionPageStyles } from '../collection_center/components/reception/styles_reception/ReceptionPageStyles_Reception'
import { Edge } from '../Types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../navigator/Navigator'
import useAnimation from '../hooks/useAnimation'
import { useEffect, useRef } from 'react'

interface Props extends NativeStackScreenProps<RootStackParams, 'DetailsNews'> { };

const DetailsNews = ({ navigation, route }: Props) => {
  const news: Edge = route.params.news
  const { nombre, modalidad, descripcion, fechaInicio, lugar, imagen } = news.node
  const { fadeOut, position, startMovingPosition, opacity, fadeIn } = useAnimation()

  useEffect(() => {
    fadeIn()
    startMovingPosition(-50, 900)
  })
  return (
    <Animated.ScrollView style={{ ...ReceptionPageStyles.container, backgroundColor: 'rgb(218,217,217)' }}>
      <Animated.View style={{ width: '100%', height: 300 }}>
        <Animated.Image source={{ uri: imagen.node.mediaItemUrl }} style={styles.imagen} />
      </Animated.View>
      <Animated.View key={Date.now()} style={{ ...styles.contentNews }}>
        <Animated.Text style={{ fontSize: 20, fontWeight: '500', opacity, transform: [{ translateY: position }] }}>{nombre}</Animated.Text>
        <Animated.View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Animated.View style={{ flexDirection: 'row' }}>
            <Animated.Text style={{ fontWeight: 'bold' }}>Evento: </Animated.Text>
            <Animated.Text>{modalidad}</Animated.Text>
          </Animated.View>
          <Animated.View>
            <Animated.Text style={{ fontWeight: 'bold' }}>Fecha de Inicio:</Animated.Text>
            <Animated.Text>{fechaInicio}</Animated.Text>
          </Animated.View>
        </Animated.View>
        <Animated.Text style={{ fontSize: 15, fontWeight: '300', marginTop: 20 }}>{descripcion}</Animated.Text>
      </Animated.View>
      <View style={{ height: 'auto', justifyContent: 'center', flexDirection: 'row', bottom: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>El evento se realizará en: </Text>
        <Text>{lugar}</Text>
      </View>
    </Animated.ScrollView>
  )
}

export default DetailsNews

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.23,
    shadowRadius: 11.27,
    elevation: 14
  },
  imagen: {
    width: '100%',
    height: 300
  },
  contentNews: {
    height: 'auto',
    width: '100%',
    top: -25,
    backgroundColor: 'rgb(218,217,217)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20
  }
})
