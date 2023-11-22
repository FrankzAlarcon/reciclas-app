import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { Alert } from 'react-native'
// import { useAuthenticate } from '../context/AuthenticateUserContext'


export const signInwithEmail = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
  .then(async (userCrendential) => {
    console.log("Token user ->", await userCrendential.user.getIdToken())
    // const { setUserToken } = useAuthenticate()
    //   setUserToken(await userCrendential.user.getIdToken())
    })
    .catch((error) => {
      console.log(error)
      if (error.code === 'auth/invalid-login-credentials') {
        const mensaje = 'usuario o contraseña incorrecta.'
        Alert.alert('error al iniciar sesión', mensaje)
      } else {
        Alert.alert('error al iniciar sesión', error.message)
      }
    })
}
