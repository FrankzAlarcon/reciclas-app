import { View, Text, TouchableOpacity } from 'react-native'
import { SignupPageStyles } from '../styles'
import { User, Mail, Previous, ReciclasLogo, Phone, Location, Password } from '../../assets'
import { useEffect, useState } from 'react'
import { postCenterEmployee, getCollectionsCenters } from '../services'
import { KeyboardAvoidingWrapper, Gradient, Input, SelectionInput } from '../../global'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../Types'
import { MessageCollectionCenter } from '../modals'
import { Button, ActivityIndicator } from 'react-native-paper'

type SignupPageCollectionCenterProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignupPage_CollectionCenter'>;
}

export function SignupPageCollectionCenter ({ navigation }: SignupPageCollectionCenterProps) {
  const [centerEmployeeName, setCenterEmployeeName] = useState('')
  const [centerEmployeeLastName, setCenterEmployeeLastName] = useState('')
  const [centerEmployeeEmail, setCenterEmployeeEmail] = useState('')
  const [centerEmployeePhone, setCenterEmployeePhone] = useState('')
  const [centerEmployeePassword, setCenterEmployeePassword] = useState('')
  const [centerEmployeeLocation, setCenterEmployeeLocation] = useState('')
  const [dataCollectionCenters, setDataCollectionCenters] = useState<String []>([])
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [isLoadingRegister, setIsLoadingRegister] = useState(false)
  const [isLoadingCenters, setIsLoadingCenters] = useState(false)

  const registerCenterEmployee = async () => {
    setIsLoadingRegister(true)
    if (centerEmployeeName.trim() === '' || centerEmployeeLastName.trim() === '' || centerEmployeeEmail.trim() === '' || centerEmployeePhone.trim() === '' || centerEmployeePassword.trim() === '' || centerEmployeeLocation === '') {
      setErrorMessage('Por favor, llene todos los campos')
      setShowErrorModal(true)
    } else {
      try {
        await postCenterEmployee(centerEmployeeEmail.trim(), centerEmployeeName.trim(), centerEmployeeLastName.trim(), centerEmployeePhone.trim(), centerEmployeePassword.trim(), centerEmployeeLocation.split(' - ')[1])
        setCenterEmployeeName('')
        setCenterEmployeeLastName('')
        setCenterEmployeeEmail('')
        setCenterEmployeePhone('')
        setCenterEmployeeLocation('')
        setShowSuccessModal(true)
      } catch (error) {
        console.log(error)
        setErrorMessage('Error al crear el usuario, por favor contacte con administración')
        setShowErrorModal(true)
      }
    }
    setIsLoadingRegister(false)
  }

  const fetchCollectionCenters = async () => {
    setIsLoadingCenters(true)
    try {
      const dataCollectionCentersBasic = await getCollectionsCenters()
      const collectionCenterOptions: string[] = []
      dataCollectionCentersBasic.body.forEach((element) => {
        collectionCenterOptions.push(`${element.name} - ${element.id}`)
      })
      setDataCollectionCenters(collectionCenterOptions)
    } catch (error) {
      console.log(error)
      setErrorMessage('Error al obtener los centros de recolección, contacte con el administrador')
      setShowErrorModal(true)
    }
    setIsLoadingCenters(false)
  }

  useEffect(() => {
    fetchCollectionCenters()
  }, [])

  return (
    <KeyboardAvoidingWrapper>
      <Gradient>
        <MessageCollectionCenter
          handlePress={() => {}}
          title='¡Error!'
          description={errorMessage}
          visible={showErrorModal}
          setVisible={setShowErrorModal}
          errorMessage
        />
        <MessageCollectionCenter
          title='¡Registro exitoso!'
          description='El registro del empleado del centro de recolección se ha realizado con éxito.'
          handlePress={() => navigation.navigate('LoginPage_CollectionCenter')}
          visible={showSuccessModal}
          setVisible={setShowSuccessModal}
        />
        <View>
          <TouchableOpacity style={SignupPageStyles.backButton} onPress={() => navigation.navigate('LoginPage_CollectionCenter')}>
            <Previous width={40} height={40} />
          </TouchableOpacity>
          <ReciclasLogo style={SignupPageStyles.appLogo} fill='#BDF26D' />
          <Text style={SignupPageStyles.appTitle}>RE·CICLAS</Text>
          <View style={SignupPageStyles.grayContainer}>
            <Text style={SignupPageStyles.processText}>Registro</Text>
            <View style={SignupPageStyles.divider} />
            <View style={SignupPageStyles.signupInputs}>
              <Input
                defaultText='Nombre'
                icon={<User />}
                setInputText={setCenterEmployeeName}
                defaultValue={centerEmployeeName}
              />
              <Input
                defaultText='Apellido'
                icon={<User />}
                setInputText={setCenterEmployeeLastName}
                defaultValue={centerEmployeeLastName}
              />
              <Input
                defaultText='Correo'
                icon={<Mail />}
                keyboard='email-address'
                setInputText={setCenterEmployeeEmail}
                defaultValue={centerEmployeeEmail}
              />
              <Input
                defaultText='Celular'
                icon={<Phone width={22} />}
                keyboard='numeric'
                setInputText={setCenterEmployeePhone}
                defaultValue={centerEmployeePhone}
              />
              <Input
                defaultText='Contraseña'
                icon={<Password />}
                setInputText={setCenterEmployeePassword}
                defaultValue={centerEmployeePassword}
                secureTextEntry
              />
              <SelectionInput
                instructionText='Selecciona un centro de recolección'
                defaultText='Centro de recolección'
                icon={<Location fill='#000' stroke='#000' strokeWidth='8' />}
                setInputText={setCenterEmployeeLocation}
                defaultValue={centerEmployeeLocation}
                options={isLoadingCenters ? ['Obteniendo centros...'] : dataCollectionCenters}
              />
            </View>
            <View style={SignupPageStyles.signupButton}>
              {isLoadingRegister
                ? <ActivityIndicator animating={isLoadingRegister} color='#77A649' size={42} />
                : <Button mode='outlined' buttonColor='#FFF' textColor='#77A649' onPress={registerCenterEmployee} labelStyle={{ fontSize: 18, fontWeight: 'bold' }} style={{ paddingHorizontal: 25 }}>Registrar</Button>}
            </View>
          </View>
        </View>
      </Gradient>
    </KeyboardAvoidingWrapper>
  )
}
