import { Gradient } from "../../global";
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Dimensions, Alert } from "react-native";
import { getToDataUser } from "../services/user_service";
import { Data } from "../../Types";
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
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const screenWidth = Dimensions.get("window").width - 60;
const chartConfig = {
  backgroundGradientFrom: "#bdf26d",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#494",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(255, 255, 150, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.1,
  // useShadowColorFromDataset: false, // optional
};
const data = {
  labels: ["Total"], // optional
  data: [0.07],
};

const UserMain_home = () => {
  const [dataUser, setDataUser] = useState<Data[]>();
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "#c0c0c0",
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
                  {/* Hola! {item.title.split(" ")[0]} */}
                  Hola! David
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
                letterSpacing: 2,
              }}
            >
              PROGRESO
            </Text>
            {/* <Text style={{ color: "white", zIndex: 5 }}>
              {JSON.stringify(dataUser)}
            </Text> */}
            <Text
              variant="bodyMedium"
              style={{
                color: "#bdf26d",
                marginVertical: 5,
                textAlign: "center",
              }}
            >
              LLevas acumulado: 18 kg
            </Text>
            <Text
              variant="bodyMedium"
              style={{
                color: "#bdf26d",
                marginVertical: 5,
                textAlign: "center",
              }}
            >
              Nivel: Cliente Frecuente
            </Text>
            <Text
              variant="bodyMedium"
              style={{
                color: "#bdf26d",
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              Medallas: 🥇
            </Text>
            <View>
              <MaterialCommunityIcons
                name="bottle-soda-classic-outline"
                size={80}
                color="#9dc565"
                style={{
                  position: "absolute",
                  bottom: 70,
                  left: 90,
                }}
              />
              <ProgressChart
                data={data}
                width={screenWidth}
                height={220}
                strokeWidth={10}
                radius={80}
                chartConfig={chartConfig}
              // hideLegend={false}
              />
            </View>
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
              label="Nombre y Apellido"
              placeholder="Type something"
              activeOutlineColor="#000"
              outlineStyle={{ borderColor: "#fff", borderRadius: 10 }}
              right={<TextInput.Affix text="/100" />}
            />
            <TextInput
              mode="outlined"
              label="Cédula"
              activeOutlineColor="#000"
              outlineStyle={{ borderColor: "#fff", borderRadius: 10 }}
              placeholder="Type something"
              right={<TextInput.Affix text="/100" />}
            />

            <TextInput
              mode="outlined"
              label="Correo"
              activeOutlineColor="#000"
              outlineStyle={{ borderColor: "#fff", borderRadius: 10 }}
              placeholder="Type something"
              right={<TextInput.Affix text="/40" />}
            />

            <View
              style={{
                marginTop: 20,
                marginBottom: 10,
                alignItems: "center",
              }}
            >
              <Text variant="bodyLarge">
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
                marginTop: 25,
              }}
            >
              <Button
                icon="account-edit"
                mode="outlined"
                style={{ borderColor: "#bdf26d" }}
                textColor="#bdf26d"
                onPress={() => console.log("Pressed")}
              >
                Actualizar
              </Button>
              <Button
                mode="contained"
                icon="blur-off"
                style={{ backgroundColor: "#bdf26d" }}
                onPress={() => hideModal()}
                textColor="#a1a1a1"
              >
                Salir
              </Button>
            </View>
            <Text
              variant="bodySmall"
              onPress={() => Alert.alert('¿Estás seguro que quieres cerrar tú sesión ahora?', '', [
                {
                  text: 'Cancelar',
                  style: 'cancel'
                },
                {
                  text: 'Salir',
                  onPress: () => signOut(auth).then(() => console.log('sesión cerrada')).catch((error) => { console.log('error:', error) })
                }
              ])}
              style={{
                marginTop: 20,
                textDecorationLine: "underline",
                textAlign: "center",
              }}
            >
              Cerrar sesión
            </Text>
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
