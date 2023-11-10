import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Gradient } from "../../global";
import { Button, Divider, Text } from "react-native-paper";
import { ReciclasLogo } from "../../assets";
import QRCode from "react-native-qrcode-svg";

let baseUser = {
  _id: "david@gmail.com",
  name: "David",
};
const UserQr_home = () => {
  const [infoQrUser, setInfoQrUser] = useState("");
  const onPressGenerateQR = () => {
    if (infoQrUser === "") {
      setInfoQrUser(baseUser._id);
    }
    setTimeout(() => {
      setInfoQrUser("");
    }, 15000);
  };

  return (
    <>
      <Gradient>
        {/* <Text>UserQr_home</Text> */}
        <View style={styles.logoHome}>
          <ReciclasLogo
            // style={{ marginBottom: 10 }}
            width={70}
            height={70}
            fill={"#bdf26d"}
          />
          <Text
            style={{
              color: "white",
              fontSize: 30,
              marginTop: 15,
              fontWeight: "bold",
              letterSpacing: 2,
            }}
          >
            Reciclaje
          </Text>
        </View>
        <View style={styles.glassContent}>
          <Text
            variant="bodySmall"
            style={{ color: "white", marginVertical: 20 }}
          >
            Presenta tu código en el Punto de Reciclaje
          </Text>
          <View
            style={{
              borderColor: "white",
              borderWidth: 1,
              width: 210,
              height: 210,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 3,
            }}
          >
            {infoQrUser && (
              <QRCode
                //   style={{ width: 300, height: 300 }}
                value={infoQrUser}
                // logo={{ uri: base64Logo1 }}
                size={200}
                logoSize={100}
                logoBackgroundColor="transparent"
              />
            )}
          </View>
          <Divider
            style={{
              backgroundColor: "white",
              marginVertical: 30,
              width: "90%",
            }}
          />
          <View>
            <Text
              variant="titleLarge"
              style={{ color: "white", marginVertical: 20 }}
            >
              Genera tu código QR
            </Text>
            <View>
              <Button
                onPress={() => onPressGenerateQR()}
                icon="qrcode"
                mode="elevated"
                buttonColor="#bdf26d"
              >
                Pulsar!
              </Button>
            </View>
          </View>
        </View>
      </Gradient>
    </>
  );
};

export default UserQr_home;
const styles = StyleSheet.create({
  logoHome: {
    width: "100%",
    marginTop: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  glassContent: {
    flex: 1,
    width: "90%",
    height: "68%",
    position: "absolute",
    bottom: 15,
    borderRadius: 20,
    // margin: "auto",
    marginLeft: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(192, 192, 192, .2)",
  },
});
