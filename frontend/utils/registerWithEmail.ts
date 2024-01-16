import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import { auth } from '../config/firebase'
import { Alert } from 'react-native'
import sendUserData from './sendUserData'
import { registerUser } from './api'

export const registerWithEmail = async (email: string, password: string, name: string, ci: string, lastname: string, phone: string, province: string, city: string, address: string, role: string = 'USER') => {


  try {
    const userData = { email, ci, name, phone, province, city, address, password, role }
    const responseData = await registerUser(userData)
    console.log(responseData);
  } catch (error) {
    console.log(error)
  }

  // try {
  //   const { user } = await createUserWithEmailAndPassword(auth, email, password)
  //   await Promise.all([
  //     updateProfile(auth.currentUser!, { displayName: name }),
  //     sendEmailVerification(user)
  //   ])
  //   const uid = auth.currentUser?.uid
  //   if (uid && email && name) {
  //     console.log(auth.currentUser?.uid)
  //     sendUserData(auth.currentUser?.uid!, name, email)
  //   } else {
  //     console.log(name)
  //     console.log(email)
  //     console.log('algo es undefined aqui')
  //   }
  // } catch (error: any) {
  //   Alert.alert('error al iniciar sesión', error.message)
  // }
}
