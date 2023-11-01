import { View, Text, TouchableOpacity } from 'react-native'
import { LoginPageStyles } from './LoginPageStyles_Login'
import { Password, ReciclasLogo, User } from '../../../assets'
import { useState } from 'react'
import { KeyboardAvoidingWrapper, Gradient, Input, useCollectionCenterContext } from '../../../global'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../Types'
import { Button, ActivityIndicator } from 'react-native-paper'
import { FIREBASE_AUTH } from '../../../firebaseConfig'
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth'
import { postCenterEmployeeIdToken } from '../../services'
import { MessageCollectionCenter } from '../../modals'

type LoginPageCollectionCenterProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LoginPage_CollectionCenter'>;
}

export function LoginPageCollectionCenter ({ navigation }: LoginPageCollectionCenterProps) {
  const [centerEmployee, setCenterEmployee] = useState('')
  const [password, setPassword] = useState('')
  const [loginErrorMessage, setLoginErrorMessage] = useState('')
  const [showLoginErrorModal, setShowLoginErrorModal] = useState(false)
  const { setFirebaseActiveUser, setIdToken, setActiveCenterEmployee, setKgCollectedToday } = useCollectionCenterContext()
  const [isLoading, setIsLoading] = useState(false)

  const loginUser = async () => {
    setIsLoading(true)
    try {
      const response = await signInWithEmailAndPassword(FIREBASE_AUTH, centerEmployee, password)
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

  return (
    <Gradient>
      <KeyboardAvoidingWrapper>
        <View>
          <ReciclasLogo style={LoginPageStyles.appLogo} fill='#BDF26D' />
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
            handlePress={() => {}}
            title='¡Error al iniciar sesión!'
            description={loginErrorMessage}
            visible={showLoginErrorModal}
            setVisible={setShowLoginErrorModal}
            errorMessage
          />
        </View>
      </KeyboardAvoidingWrapper>
    </Gradient>
  )
}
