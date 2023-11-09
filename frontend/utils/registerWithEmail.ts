import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import { auth } from '../config/firebase'
import { Alert } from 'react-native'
// import { Alert } from 'react-native'

export const registerWithEmail = async (email: string, password: string, name: string) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(auth.currentUser!, { displayName: name })
    await sendEmailVerification(user)
    console.log(auth.currentUser?.displayName)
  } catch (error: any) {
    Alert.alert('error al iniciar sesión', error.message)
  }
}
