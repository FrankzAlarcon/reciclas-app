import { Gradient } from "../../../global";
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { getToDataUser } from "../../services/user_service";
import { Data } from "../../../Types";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Modal,
  Portal,
  Text,
  Button,
  PaperProvider,
  TextInput,
} from "react-native-paper";
import { ProgressChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width - 60;
const chartConfig = {
  backgroundGradientFrom: "#bdf26d",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#494",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(255, 255, 150, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
const data = {
  labels: ["Medalla", "Dias", "Kg"], // optional
  data: [0.8, 0.12, 0.013],
};

const UserMain_home = () => {
  const [dataUser, setDataUser] = useState<Data[]>();
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 30,
    margin: 20,
    borderRadius: 10,
  };

  async function fetchData() {
    const dataUserBasic = await getToDataUser();
    setDataUser(dataUserBasic);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <PaperProvider>
      <Gradient>
        <View style={styles.box}>
          <AntDesign
            name="ellipsis1"
            size={24}
            color="#c0c0c0"
            style={{ zIndex: 2, position: "absolute", top: 5, right: 15 }}
            onPress={showModal}
          />
          {dataUser?.map((item) => (
            <View style={styles.contentData} key={item.id}>
              <View>
                <Image
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                  // source={{ uri: item.url }}
                  source={{
                    uri: "https://png.pngtree.com/png-vector/20210426/ourlarge/pngtree-young-man-cartoon-profile-vector-hd-image-png-image_3238138.jpg",
                  }}
                />
              </View>

              <View>
                <Text style={styles.text}>
                  Hola! {item.title.split(" ")[0]}
                </Text>
              </View>
            </View>
          ))}
          <View>
            <Text variant="titleLarge" style={styles.textMain}>
              Bienvenidos a Reciclas la mejor App de reciclaje.
            </Text>
          </View>
        </View>
        {/* ----- */}

        <View style={styles.prueba}>
          <View>
            <Text
              variant="titleLarge"
              style={{
                color: "white",
                paddingVertical: 10,
                textAlign: "center",
                // display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
                // alignContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="progress-star"
                size={24}
                color="white"
              />
              TU PROGRESO
            </Text>
            {/* <Text style={{ color: "white", zIndex: 5 }}>
              {JSON.stringify(dataUser)}
            </Text> */}

            <ProgressChart
              data={data}
              width={screenWidth}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={false}
            />
          </View>
        </View>
        {/* </ScrollView> */}
      </Gradient>
      {/* -------- Modal -------- */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <View>
            <Text variant="headlineSmall">
              <MaterialIcons name="person-pin" size={20} color="black" /> Mi
              Perfil
            </Text>
            <TextInput
              mode="outlined"
              label="Nombre"
              placeholder="Type something"
              right={<TextInput.Affix text="/100" />}
            />
            <TextInput
              mode="outlined"
              label="Apellido"
              placeholder="Type something"
              right={<TextInput.Affix text="/100" />}
            />

            <TextInput
              mode="outlined"
              label="Correo"
              placeholder="Type something"
              right={<TextInput.Affix text="/40" />}
            />

            <View
              style={{
                marginTop: 20,
                alignItems: "center",
              }}
            >
              <Text variant="bodyMedium">
                <MaterialCommunityIcons
                  name="face-agent"
                  size={24}
                  color="black"
                />{" "}
                Contacta a soporte
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Button
                icon="account-edit"
                mode="outlined"
                style={{ borderColor: "#bdf26d" }}
                onPress={() => console.log("Pressed")}
              >
                Actualizar
              </Button>
              <Button
                icon="blur-off"
                style={{ backgroundColor: "#bdf26d" }}
                onPress={() => hideModal()}
              >
                Salir
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </PaperProvider>
  );
};

export default UserMain_home;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    fontStyle: "normal",
  },
  textMain: {
    fontSize: 16,
    fontWeight: "400",
    color: "white",
    padding: 20,
    textAlign: "center",
  },

  box: {
    width: "90%",
    height: "32%",
    position: "absolute",
    bottom: 460,
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(192, 192, 192, .2)",
    borderRadius: 20,
    margin: "auto",
    marginLeft: 20,
  },
  boxProgress: {
    width: "100%",
    height: "60%",
    position: "absolute",
    bottom: 0,
  },
  contentData: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  prueba: {
    flex: 1,
    width: "90%",
    height: "55%",
    position: "absolute",
    bottom: 15,
    borderRadius: 20,
    margin: "auto",
    marginLeft: 20,
    // marginRight: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "rgba(192, 192, 192, .2)",
    // opacity: 0.2,
  },
});
