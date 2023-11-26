import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { GradientLogin } from './global'
import { ReciclasLogo } from './assets'
import {
  Button,
  Dialog,
  PaperProvider,
  Portal,
  TextInput,
  Text,
  Modal,
  Divider
} from 'react-native-paper'
import { useForm } from './hooks/useForm'
import { signInwithEmail } from './utils/signInWithEmail'
import { registerWithEmail } from './utils/registerWithEmail'
import {
  CollectionCenter
} from './collection_center'
import { useAuthenticate } from './context/AuthenticateUserContext'

const LoginAthentication = () => {
  const [visible, setVisible] = React.useState(false)
  const [showRegis, setShowRegis] = React.useState(false)

  const { userCenter, setUserCenter } = useAuthenticate()

  const { form, onChange } = useForm({
    email: '',
    password: '',
    nombre: ''
  })

  const { email, password, nombre } = form

  const hideDialog = () => {
    setVisible(!visible)
  }

  // Modal
  const showRegister = () => setShowRegis(!showRegis)

  return !userCenter
    ? (
      <PaperProvider>
        <GradientLogin>
          <SafeAreaView style={styles.logoHome}>
            <ReciclasLogo
              width={70}
              height={70}
              fill='#bdf26d'
              onPress={() => hideDialog()}
            />
            <View>
              <Text
                variant='bodySmall'
                style={{
                  color: 'white',
                  fontSize: 40,
                  paddingTop: 25,
                  letterSpacing: 2
                }}
              >
                RE-CICLAS
              </Text>
            </View>
            <Text style={{ color: 'white', letterSpacing: 3 }}>ECUADOR</Text>
          </SafeAreaView>
          <View style={styles.content_glass}>
            <TextInput
              mode='outlined'
              label='Correo'
              placeholder='Escribe tu correo'
              onChangeText={(value) => onChange(value, 'email')}
            // right={<TextInput.Affix text="/100" />}
              outlineStyle={{ borderColor: '#fff', borderRadius: 10 }}
              textColor='#000'
              cursorColor='#000'
              activeOutlineColor='#000'
              outlineColor='#fff'
              style={{
                width: '90%',
                marginVertical: 20
              }}
            />
            <TextInput
              mode='outlined'
              label='Password'
              placeholder='Escribe tu password'
            // right={<TextInput.Affix text="/100" />}
              onChangeText={(value) => onChange(value, 'password')}
              outlineStyle={{ borderColor: '#fff', borderRadius: 10 }}
            // underlineStyle={{ borderColor: "#000" }}
              textColor='#000'
              cursorColor='#000'
              activeOutlineColor='#000'
              outlineColor='#fff'
            // secureTextEntry
              style={{ width: '90%', marginVertical: 10 }}
            />
            <Button
              icon='login'
              mode='elevated'
              style={{
                backgroundColor: '#bdf26d',
                width: '70%',
                marginVertical: 20
              }}
              onPress={() => signInwithEmail(email, password)}
            >
              Ingresar
            </Button>
            <Text
              variant='labelLarge'
              style={{
                color: 'white',
                marginVertical: 10,
                textDecorationLine: 'underline'
              }}
              onPress={() => showRegister()}
            >
              Registrate
            </Text>
          </View>
          <ReciclasLogo
            width={40}
            height={40}
            fill='#bdf26d'
            style={{ position: 'absolute', bottom: 40, alignSelf: 'center' }}
          />
          {/* <Text style={{ color: "white" }}>Ecuador</Text> */}
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Icon icon='alert' />
              <Dialog.Title style={{ color: '#000', alignSelf: 'center' }}>
                Centro de acopio
              </Dialog.Title>
              <Dialog.Content>
                <Text>Seguro quiere ingresar?</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setVisible(false)}>Cancel</Button>
                <Button onPress={() => {
                  setUserCenter(true)
                  setVisible(!visible)
                }}
                >Ok
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

          {/* Modal */}
          <Portal>
            <Modal
              visible={showRegis}
              onDismiss={showRegister}
              contentContainerStyle={{
                backgroundColor: '#c0c0c0',
                borderRadius: 10,
                width: '90%',
                marginHorizontal: '5%',
                alignItems: 'center'
              }}
            >
              <ScrollView
                style={{
                  borderRadius: 30,
                  height: '64%',
                  width: '90%',
                  paddingTop: 20
                }}
              >
                <TextInput
                  mode='outlined'
                  label='Nombre y Apellido'
                  placeholder='Nombre y Apellido'
                  onChangeText={(value) => onChange(value, 'nombre')}
                // right={<TextInput.Affix text="/100" />}
                  outlineStyle={{ borderColor: '#fff', borderRadius: 10 }}
                  textColor='#000'
                  cursorColor='#000'
                  activeOutlineColor='#000'
                  outlineColor='#fff'
                />
                <TextInput
                  mode='outlined'
                  label='Cédula'
                  placeholder='Ingrese cédula'
                // onChangeText={(value) =>
                //   onChange(value.charAt(0).toUpperCase(), "email")
                // }
                // right={<TextInput.Affix text="/100" />}
                  outlineStyle={{ borderColor: '#fff', borderRadius: 10 }}
                  textColor='#000'
                  cursorColor='#000'
                  activeOutlineColor='#000'
                  outlineColor='#fff'
                />
                <TextInput
                  mode='outlined'
                  label='Ciudad'
                  placeholder='Ingrese el ciudad'
                // onChangeText={(value) =>
                //   onChange(value, "email")
                // }
                // right={<TextInput.Affix text="/100" />}
                  outlineStyle={{ borderColor: '#fff', borderRadius: 10 }}
                  textColor='#000'
                  cursorColor='#000'
                  activeOutlineColor='#000'
                  outlineColor='#fff'
                />
                <TextInput
                  mode='outlined'
                  label='Correo'
                  placeholder='Ingrese el correo'
                  onChangeText={(value) => onChange(value, 'email')}
                // right={<TextInput.Affix text="/100" />}
                  outlineStyle={{ borderColor: '#fff', borderRadius: 10 }}
                  textColor='#000'
                  cursorColor='#000'
                  activeOutlineColor='#000'
                  outlineColor='#fff'
                />
                <TextInput
                  mode='outlined'
                  label='Contraseña'
                  placeholder='Ingrese el contraseña'
                  onChangeText={(value) => onChange(value, 'password')}
                // right={<TextInput.Affix text="/100" />}
                  outlineStyle={{ borderColor: '#fff', borderRadius: 10 }}
                  textColor='#000'
                  cursorColor='#000'
                  activeOutlineColor='#000'
                  outlineColor='#fff'
                />
                <TextInput
                  mode='outlined'
                  label='Confirme la contraseña'
                  placeholder='Confirme la contraseña'
                // onChangeText={(value) =>
                //   onChange(value, "email")
                // }
                // right={<TextInput.Affix text="/100" />}
                  outlineStyle={{ borderColor: '#fff', borderRadius: 10 }}
                  textColor='#000'
                  cursorColor='#000'
                  activeOutlineColor='#000'
                  outlineColor='#fff'
                />
                <Divider
                  style={{ backgroundColor: 'black', marginVertical: 30 }}
                />
                <Button
                  icon='file-plus'
                  mode='elevated'
                  style={{
                    backgroundColor: '#bdf26d',
                    width: '80%',
                    marginBottom: 25,
                    marginHorizontal: '10%'
                  }}
                  onPress={() => registerWithEmail(email, password, nombre)}
                >
                  Registrate
                </Button>
              </ScrollView>
            </Modal>
          </Portal>
        </GradientLogin>
      </PaperProvider>
      )
    : (
      <CollectionCenter />
      )
}

export default LoginAthentication

const styles = StyleSheet.create({
  logoHome: {
    width: '100%',
    marginTop: 60,
    display: 'flex',
    alignItems: 'center'
  },
  content_glass: {
    flex: 1,
    width: '90%',
    height: '40%',
    position: 'absolute',
    bottom: 180,
    borderRadius: 20,
    margin: 'auto',
    marginLeft: 20,
    display: 'flex',
    backgroundColor: 'rgba(192, 192, 192, .2)',
    alignItems: 'center',
    alignContent: 'center'
  }
})
