import { ref, set } from '@firebase/database'
import { realtimeDB } from '../config/firebase'

const sendUserData = (uid: string, name: string, email: string) => {
  set(ref(realtimeDB, 'users/' + uid), {
    name,
    email
  })
}

export default sendUserData
