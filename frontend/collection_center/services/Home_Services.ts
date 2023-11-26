export const getToPickupCollectionCenter = async (collectionCenterId: number|undefined, idToken: string): Promise<number> => {
  const url = `https://reciclas-app-backend-dev-sptb.3.us-1.fl0.io/api/v1/collect-centers/${collectionCenterId}/total-today-recolected`
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${idToken}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(data => {
      return data.body.total
    })
    .catch(error => {
      console.error('Fetch error:', error)
      throw error
    })
}
