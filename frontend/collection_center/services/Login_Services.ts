import { CenterEmployeeLogin } from '../../Types'

export const postCenterEmployeeIdToken = async (idToken: string): Promise<CenterEmployeeLogin> => {
  const url = 'https://reciclas-app-backend-dev-sptb.3.us-1.fl0.io/api/v1/auth/login'
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      idToken
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(data => {
      return data
    })
    .catch(error => {
      console.error('Fetch error:', error)
      throw error
    })
}
