import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Gradient } from "../../global";
import { Button, Divider, Text } from "react-native-paper";
import { ReciclasLogo } from "../../assets";
import QRCode from "react-native-qrcode-svg";
import { useAuthenticate } from "../../context/AuthenticateUserContext";

let baseUser = {
  _id: "david@gmail.com",
  name: "David",
};

let apiUrlGetKgUser =
  "https://reciclas-app-backend-dev-sptb.3.us-1.fl0.io/api/v1/log-actions-collaborators/user/";

type DataItem = {
  attentionQuality: null;
  collaboratorEmail: string;
  collectCenterId: number;
  createdAt: string;
  id: number;
  quantity: number;
  receiverEmail: string;
  submitDate: string;
  updatedAt: string;
};

type DataResponse = {
  body: DataItem[];
  error: null | any;
};
const UserQr_home = () => {
  const [infoQrUser, setInfoQrUser] = useState("");
  const { userToken, user } = useAuthenticate();
  const [userKg, setUserKg] = useState<DataResponse>({
    body: [
      {
        attentionQuality: null,
        collaboratorEmail: "usuario@email.com",
        collectCenterId: 1,
        createdAt: "2023-11-11T13:43:26.060Z",
        id: 1,
        quantity: 10.5,
        receiverEmail: "empleado@email.com",
        submitDate: "2023-10-24T14:30:00.000Z",
        updatedAt: "2023-11-11T13:43:26.060Z",
      },
    ],
    error: null,
  });

  const userIdEmail = user?.email;

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  };

  const getKgUser = async () => {
    try {
      const response = await fetch(
        apiUrlGetKgUser + userIdEmail,
        requestOptions
      );
      const data = await response.json();

      setUserKg(data);
    } catch (error) {
      console.error(error);
    }

    console.log(
      "userKg api-> ",
      userKg.body.reduce((total: number, item: any) => total + item.quantity, 0)
    );
  };
  const onPressGenerateQR = () => {
    if (infoQrUser === "") {
      setInfoQrUser(baseUser._id);
      // console.log("userKg-> ", userKg);
    }
    setTimeout(() => {
      setInfoQrUser("");
      getKgUser();
    }, 15000);
  };

  return (
    <>
      <Gradient>
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
