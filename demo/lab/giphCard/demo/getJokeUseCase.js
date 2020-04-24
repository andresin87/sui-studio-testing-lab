import fetch from 'node-fetch'

const getJokeUseCase = () => {
  return fetch('https://api.icndb.com/jokes/random')
    .then(response => {
      return response.ok ? response.json() : null
    })
    .then(data => {
      const hasData = Boolean(data)
      if (!hasData) return 'random'

      const {joke} = data.value
      return joke
    })
}

export default getJokeUseCase
