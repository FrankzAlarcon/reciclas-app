import { CollectionCenters } from '../../Types'

export const postCenterEmployee = async (email: string, name: string, lastname: string, phone: string, password: string, collectCenterId: string): Promise<any> => {
  const url = 'https://reciclas-app-backend-dev-sptb.3.us-1.fl0.io/api/v1/auth/register-employee'
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      email,
      name: name + ' ' + lastname,
      phone,
      password,
      role: 'CENTER_EMPLOYEE',
      collectCenterId
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

export const getCollectionsCenters = async (): Promise<CollectionCenters> => {
  const url = 'https://reciclas-app-backend-dev-sptb.3.us-1.fl0.io/api/v1/collect-centers/all'
  return fetch(url)
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
