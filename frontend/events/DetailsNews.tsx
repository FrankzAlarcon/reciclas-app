import { StyleSheet, Text, Animated } from "react-native";
import { Edge } from "../Types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useAnimation from "../hooks/useAnimation";
import { useEffect } from "react";
import { RootStackParams } from "../navigator/TabNavigator";

interface Props
  extends NativeStackScreenProps<RootStackParams, "DetailsNews"> {}

const DetailsNews = ({ navigation, route }: Props) => {
  const { news }: { news: Edge } = route.params;
  const {
    nombre,
    modalidad,
    descripcion,
    fechaInicio,
    lugar,
    imagen,
    horaInicio,
  } = news.node;
  const { position, startMovingPosition, opacity, fadeIn } = useAnimation();

  useEffect(() => {
    fadeIn();
    startMovingPosition(-50, 900);
  });
  return (
    <Animated.ScrollView style={{ backgroundColor: "rgb(218,217,217)" }}>
      <Animated.View style={{ width: "100%", height: 300 }}>
        <Animated.Image
          source={{ uri: imagen.node.mediaItemUrl }}
          style={styles.imagen}
        />
      </Animated.View>
      <Animated.View key={Date.now()} style={{ ...styles.contentNews }}>
        <Animated.Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            opacity,
            transform: [{ translateY: position }],
          }}
        >
          {nombre}
        </Animated.Text>
        <Animated.View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            opacity,
            transform: [{ translateY: position }],
          }}
        >
          <Animated.View style={{ flexDirection: "column" }}>
            <Animated.Text style={{ fontWeight: "bold" }}>
              Evento:{" "}
            </Animated.Text>
            <Animated.Text>{modalidad}</Animated.Text>
          </Animated.View>
          <Animated.View>
            <Animated.Text style={{ fontWeight: "bold" }}>Fecha:</Animated.Text>
            <Animated.Text>{fechaInicio}</Animated.Text>
          </Animated.View>
          <Animated.View>
            <Animated.Text style={{ fontWeight: "bold" }}>Hora: </Animated.Text>
            <Animated.Text>{horaInicio}</Animated.Text>
          </Animated.View>
        </Animated.View>
        <Animated.Text
          style={{
            fontSize: 15,
            fontWeight: "300",
            marginVertical: 40,
            opacity,
            transform: [{ translateY: position }],
          }}
        >
          {descripcion}
        </Animated.Text>
      </Animated.View>
      <Animated.View
        style={{
          height: "auto",
          justifyContent: "center",
          flexDirection: "row",
          bottom: 10,
          opacity,
          transform: [{ translateY: position }],
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Lugar: </Text>
        <Text>{lugar}</Text>
      </Animated.View>
    </Animated.ScrollView>
  );
};

export default DetailsNews;

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.23,
    shadowRadius: 11.27,
    elevation: 14,
  },
  imagen: {
    width: "100%",
    height: 300,
  },
  contentNews: {
    height: "auto",
    width: "100%",
    top: -25,
    backgroundColor: "rgb(218,217,217)",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },
});
