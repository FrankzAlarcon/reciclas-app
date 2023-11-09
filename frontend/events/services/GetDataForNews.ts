export const GetDataForNews = async () => {
  const url = 'https://reciclasevent1.wpenginepowered.com/graphql'

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query: `query eventosQuery{
            eventos {
              edges {
                node {
                  id
                  nombre
                  descripcion
                  fechaInicio
                  fechaFin
                  horaInicio
                  horaFin
                  imagen {
                    node {
                      mediaItemUrl
                    }
                  }
                  modalidad
                  lugar
                  author {
                    node {
                      name
          
                    }
                  }
                }
              }
            }
          }`
    })
  })
  const data = await res.json()
  return data
}
