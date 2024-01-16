export const postLogActionCollaborator = async (submitDate: string, quantity: string, collaboratorEmail: string, collectCenterId: string, receiverEmail: string, idToken: string): Promise<string> => {
  const url = 'https://reciclas-app-backend-dev-sptb.3.us-1.fl0.io/api/v1/log-actions-collaborators'
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      data: {
        submitDate,
        quantity,
        collaboratorEmail,
        collectCenterId,
        receiverEmail
      },
      token: idToken
    }),
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
    .then((json) => {
      return String(json.body.id)
    })
    .catch(error => {
      console.error('Fetch error:', error)
      throw error
    })
}

export const postObservation = async (comment: string, logActionsCollaboratorId: string, idToken: string): Promise<any> => {
  const url = 'https://reciclas-app-backend-dev-sptb.3.us-1.fl0.io/api/v1/observations'
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      comment,
      logActionsCollaboratorId
    }),
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
      return data
    })
    .catch(error => {
      console.error('Fetch error:', error)
      throw error
    })
}
