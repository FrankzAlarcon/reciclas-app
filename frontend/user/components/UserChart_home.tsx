import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Gradient } from "../../global";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Chip, Divider } from "react-native-paper";

const { width, height } = Dimensions.get("screen");

const imageW = width * 0.6;
const imageH = imageW * 1;
const data = [
  {
    uri: "https://album.es/fotos/uploads/imagenes/thumbs/arbol_DSC00308_1200px.jpg?compress=1&resize=1200x1200",
    title: "Arboles",
    quantity: "0,06",
  },
  {
    uri: "https://schippers.com.br/wp-content/uploads/2021/07/As-desvantagens-do-cloro-comum-no-tratamento-da-agua-de-bebida2.jpg?compress=1&resize=1200x1200",
    title: "Litros de agua",
    quantity: "0,1",
  },
  {
    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/NIGU_Strain_tower.JPG/1200px-NIGU_Strain_tower.JPG?compress=1&resize=1200x1200",
    title: "Kwh Energía",
    quantity: "2,3",
  },
  {
    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Petroleo_de.jpg/1200px-Petroleo_de.jpg?compress=1&resize=1200x1200",
    title: "Litros de Petroleo",
    quantity: "0,9",
  },
  {
    uri: "https://www.freeingenergy.com/wp-content/uploads/2019/05/Pollution-and-smoke-123rf-25873187_l-1200px.jpg?compress=1&resize=1200x1200",
    title: "Kg de CO2",
    quantity: "2,5",
  },
  {
    uri: "https://static.buscapromos.com/storage/2022/11/03195634/61zja4HOlmL._AC_SL1000_.jpg?compress=1&resize=1200x1200",
    title: "Horas de un foco",
    quantity: "3,5",
  },
];

//---
const mesesEnEspanol = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const fechaActual = new Date();
const numeroMesActual = fechaActual.getMonth();
const indiceMesAnterior = (numeroMesActual + 11) % 12;
const indiceMesSiguiente = (numeroMesActual + 1) % 12;
const mesActual = mesesEnEspanol[numeroMesActual];
const mesAnterior = mesesEnEspanol[indiceMesAnterior];
const mesSiguiente = mesesEnEspanol[indiceMesSiguiente];

//---
const UserChart_home = () => {
  return (
    <Gradient>
      <Text
        style={{
          color: "white",
          fontSize: 30,
          marginTop: 45,
          fontWeight: "bold",
          letterSpacing: 2,
          textAlign: "center",
        }}
      >
        Eco - Equivalencias {"\n"} 18
        <MaterialCommunityIcons
          name="weight-kilogram"
          size={24}
          color="white"
        />
      </Text>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          top: 10,
        }}
      >
        <LineChart
          data={{
            labels: [mesAnterior, mesActual, mesSiguiente],
            datasets: [
              {
                data: [
                  Math.random() * 10,
                  Math.random() * 10,
                  Math.random() * 10,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width - 38}
          // width={Dimensions.get("window").width}
          height={200}
          // yAxisLabel="$"
          yAxisSuffix="kg"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#bdf26d",
            backgroundGradientFrom: "#bdf26d",
            backgroundGradientTo: "#494",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 10,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#b1b1b1",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      {/* ----- */}
      <Text
        style={{
          color: "white",
          marginVertical: 30,
          fontSize: 15,
          alignSelf: "center",
          letterSpacing: 1,
        }}
      >
        David evitaste el consumo de:
      </Text>
      <View
        style={{
          flex: 1,
        }}
      >
        {/* <StatusBar hidden /> sirve par quitar la hora */}
        <FlatList
          style={{ marginTop: 10 }}
          data={data}
          // fadingEdgeLength={15}
          horizontal
          pagingEnabled
          // keyExtractor={(_, index) => index.toString()}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  width,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "rgba(68, 153, 68, 0.3)",
                  borderRadius: 10,
                  borderWidth: 1,
                  height: "95%",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 20, marginVertical: 10 }}
                >
                  {item.title}
                </Text>
                <Image
                  source={{ uri: item.uri }}
                  style={{
                    width: imageW,
                    height: imageH,
                    resizeMode: "cover",
                    borderRadius: 10,
                  }}
                />
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    marginVertical: 10,
                    letterSpacing: 1,
                  }}
                >
                  {item.quantity}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </Gradient>
  );
};

export default UserChart_home;

const styles = StyleSheet.create({});
