import { View, Text, TouchableOpacity } from 'react-native'
import { LoginPageStyles } from './LoginPageStyles_Login'
import { Password, ReciclasLogo, User } from '../../../assets'
import React, { useState } from 'react'
import { KeyboardAvoidingWrapper, Gradient, Input, useCollectionCenterContext } from '../../../global'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../Types'
import { Button, ActivityIndicator, Dialog, Portal } from 'react-native-paper'
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth'
import { postCenterEmployeeIdToken } from '../../services'
import { MessageCollectionCenter } from '../../modals'
import { auth } from '../../../config/firebase'
import { useAuthenticate } from '../../../context/AuthenticateUserContext'

type LoginPageCollectionCenterProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LoginPage_CollectionCenter'>;
}

export function LoginPageCollectionCenter({ navigation }: LoginPageCollectionCenterProps) {
  const [centerEmployee, setCenterEmployee] = useState('')
  const [password, setPassword] = useState('')
  const [loginErrorMessage, setLoginErrorMessage] = useState('')
  const [showLoginErrorModal, setShowLoginErrorModal] = useState(false)
  const { setFirebaseActiveUser, setIdToken, setActiveCenterEmployee, setKgCollectedToday } = useCollectionCenterContext()
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = React.useState(false);
  const { userCenter, setUserCenter } = useAuthenticate();

  const loginUser = async () => {
    setIsLoading(true)
    try {
      const response = await signInWithEmailAndPassword(auth, centerEmployee, password)
      const idToken = await getIdToken(response.user)
      const loginResponse = await postCenterEmployeeIdToken(idToken)
      if (loginResponse.body.role === 'CENTER_EMPLOYEE') {
        setIdToken(idToken)
        setFirebaseActiveUser(response.user)
        setActiveCenterEmployee(loginResponse.body.user)
        setKgCollectedToday(loginResponse.body.total)
        setCenterEmployee('')
        setPassword('')
        navigation.navigate('Menu_CollectionCenter')
      } else {
        setLoginErrorMessage('El usuario ingresado no es un empleado de centro de acopio')
        setShowLoginErrorModal(true)
      }
    } catch (error) {
      console.log(error)
      setLoginErrorMessage('El usuario o la contraseña son incorrectos')
      setShowLoginErrorModal(true)
    }
    setIsLoading(false)
  }
  const hideDialog = () => {
    setVisible(!visible);
  };

  return (
    <Gradient>
      <KeyboardAvoidingWrapper>
        <View>
          <ReciclasLogo style={LoginPageStyles.appLogo} fill='#BDF26D' onPress={() => hideDialog()} />
          <Text style={LoginPageStyles.appTitle}>RE·CICLAS</Text>
          <Text style={LoginPageStyles.appSubTitle}>ECUADOR</Text>
          <Text style={LoginPageStyles.appDescription}>
            bicicletas ecológicas
          </Text>
          <View style={LoginPageStyles.grayContainer}>
            <Text style={LoginPageStyles.welcomeText}>¡Bienvenido!</Text>
            <Text style={LoginPageStyles.rolText}>Administración</Text>
            <View style={LoginPageStyles.loginInputs}>
              <Input
                defaultText='Correo'
                icon={<User />}
                setInputText={setCenterEmployee}
                defaultValue={centerEmployee}
              />
              <Input
                defaultText='Contraseña'
                icon={<Password />}
                setInputText={setPassword}
                defaultValue={password}
                secureTextEntry
              />
            </View>
            <TouchableOpacity style={LoginPageStyles.otherOptionsContainer} onPress={() => navigation.navigate('SignupPage_CollectionCenter')}>
              <Text style={LoginPageStyles.otherOptionsText}>
                ¿No tienes una cuenta? Regístrate
              </Text>
            </TouchableOpacity>
            <View style={LoginPageStyles.loginButton}>
              {isLoading
                ? <ActivityIndicator animating={isLoading} color='#77A649' size={42} />
                : <Button mode='outlined' buttonColor='#FFF' textColor='#77A649' onPress={loginUser} labelStyle={{ fontSize: 18, fontWeight: 'bold' }} style={{ paddingHorizontal: 25 }}>Iniciar sesión</Button>}
            </View>
            <TouchableOpacity style={LoginPageStyles.otherOptionsContainer}>
              <Text style={LoginPageStyles.otherOptionsText}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>
            <ReciclasLogo width={30} height={30} style={LoginPageStyles.bottomAppLogo} fill='#BDF26D' />
          </View>
          <MessageCollectionCenter
            handlePress={() => { }}
            title='¡Error al iniciar sesión!'
            description={loginErrorMessage}
            visible={showLoginErrorModal}
            setVisible={setShowLoginErrorModal}
            errorMessage
          />
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Icon icon="alert" />
              <Dialog.Title style={{ color: "#000", alignSelf: "center" }}>
                Centro de acopio
              </Dialog.Title>
              <Dialog.Content>
                <Text>Seguro quiere ingresar?</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setVisible(false)}>Cancel</Button>
                <Button onPress={() => {
                  setUserCenter(false)
                  setVisible(!visible)
                }
                }>Ok</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </KeyboardAvoidingWrapper>
    </Gradient>
  )
}
