import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
import { HomePageStyles } from '../styles'
import { CenterEmployeeBody, RootStackParamList } from '../../Types'
import { useCallback, useEffect, useState } from 'react'
import { getToPickupCollectionCenter } from '../services'
import { Gradient, useCollectionCenterContext } from '../../global'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ConfirmationCollectionCenter, MessageCollectionCenter } from '../modals'
import { ProgressChart } from 'react-native-chart-kit'
import { ReciclasLogo, Logout } from '../../assets'
import { User, signOut } from 'firebase/auth'
import { useFocusEffect } from '@react-navigation/native'
import { auth } from '../../config/firebase'

type HomePageCollectionCenterProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HomePage_CollectionCenter'>;
}

export function HomePageCollectionCenter ({ navigation }: HomePageCollectionCenterProps) {
  const [totalCollectedToday, setTotalCollectedToday] = useState<number>()
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false)
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { setFirebaseActiveUser, activeCenterEmployee, setActiveCenterEmployee, idToken, setIdToken, kgCollectedToday } = useCollectionCenterContext()
  const [chartData, setChartData] = useState<number[]>([0] as number[])
  let firstRender = true
  const setFirstRender = (value: boolean) => {
    firstRender = value
  }

  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(189, 242, 109, ${opacity})`
  }

  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height

  async function fetchTotalCollectedToday () {
    try {
      const totalCollectedTodayBasic = await getToPickupCollectionCenter(activeCenterEmployee?.collectCenterId, idToken)
      setTotalCollectedToday(totalCollectedTodayBasic)
      setChartData([(totalCollectedTodayBasic > 300 ? 1 : (totalCollectedTodayBasic) / 300)])
    } catch (error) {
      setErrorMessage('No fue posible actualizar la cantidad de residuos recolectados hoy, por favor contacte con administración')
      setShowErrorModal(true)
    }
  }

  useEffect(() => {
    const handleBack = () => navigation.addListener('beforeRemove', (e) => {
      e.preventDefault()
    })
    handleBack()
  }, [navigation])

  useFocusEffect(useCallback(() => {
    if (!firstRender) {
      fetchTotalCollectedToday()
    } else {
      setTotalCollectedToday(kgCollectedToday)
      setChartData([(kgCollectedToday > 300 ? 1 : (kgCollectedToday) / 300)])
    }
    setFirstRender(false)
  }, []))

  return (
    <Gradient>
      <ConfirmationCollectionCenter
        onConfirm={() => {
          setFirebaseActiveUser({} as User)
          setActiveCenterEmployee({} as CenterEmployeeBody)
          setIdToken('')
          signOut(auth)
          navigation.navigate('LoginPage_CollectionCenter')
        }}
        onNotConfirm={() => { }}
        title='¿Cerrar sesión?'
        description='Estás por salir de la pantalla principal, ¿estás seguro de querer cerrar sesión?'
        confirmText='Cerrar sesión'
        notConfirmText='Cancelar'
        visible={showConfirmationModal}
        setVisible={setShowConfirmationModal}
      />
      <MessageCollectionCenter
        title='¡Error!'
        description={errorMessage}
        buttonText='Aceptar'
        visible={showErrorModal}
        setVisible={setShowErrorModal}
        errorMessage
        handlePress={() => {}}
      />
      <View style={HomePageStyles.user}>
        <TouchableOpacity style={HomePageStyles.logout} onPress={() => setShowConfirmationModal(true)}>
          <Logout width={45} height={45} fill='none' stroke='#FFF' />
        </TouchableOpacity>
        <Image style={HomePageStyles.userImage} source={{ uri: 'https://static.wikia.nocookie.net/multiversus/images/7/71/Evil_Morty_Profile_Icon.png/revision/latest?cb=20220816020218' }} />
        <Text style={HomePageStyles.userName}>¡Hola, {activeCenterEmployee?.name?.split(' ')[0]}!</Text>
      </View>
      <View style={HomePageStyles.summary}>
        <Text style={HomePageStyles.sectionTitle}>Resumen</Text>
        <View style={HomePageStyles.grayContainer}>
          <Text style={HomePageStyles.quantityText}>Cantidad receptada</Text>
          <Text style={HomePageStyles.quantity}>{totalCollectedToday} Kg</Text>
        </View>
        <View style={[HomePageStyles.grayContainer, HomePageStyles.chartContainer]}>
          <View style={{ alignItems: 'center' }}>
            <ProgressChart
              data={chartData}
              width={screenWidth * 0.4}
              height={screenHeight * 0.25}
              radius={70}
              chartConfig={chartConfig}
              hideLegend
              style={{ borderRadius: 30 }}
            />
            <ReciclasLogo width={50} height={50} fill={(chartData[0] >= 1 ? '#BDF26D' : 'gray')} style={HomePageStyles.chartAppLogo} />
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={HomePageStyles.percentage}>{(chartData[0] * 100).toFixed(1)}%</Text>
            <Text style={HomePageStyles.dailyGoal}>Meta diaria: 300kg</Text>
            {(chartData[0] >= 1
              ? <Text style={HomePageStyles.successText}>¡Completada!</Text>
              : null)}
          </View>
        </View>
      </View>
    </Gradient>
  )
}
