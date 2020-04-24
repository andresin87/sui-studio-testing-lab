import fetch from 'node-fetch'

const getUrl = joke => {
  const jokeWords = joke.split(' ')
  const query = jokeWords.slice(0, 3).join(' ')
  return `https://api.giphy.com/v1/gifs/search?api_key=2cZkiFTqyiS79UdSapL6LHWlublpl7iy&q=${query}`
}

// reset on joke change
const inMemoryImages = []

const getGiphUseCase = joke => {
  const hasImages = Boolean(inMemoryImages.length)

  if (hasImages) {
    const shiftGiph = inMemoryImages.shift()
    return Promise.resolve(shiftGiph.images.fixed_height_still.url)
  }

  if (joke) {
    const url = getUrl(joke)
    return fetch(url)
      .then(response => {
        return response.ok ? response.json() : {}
      })
      .then(({data}) => {
        const hasData = Boolean(data)
        if (!hasData) return
        const {0: firstGiph} = data
        const {images} = firstGiph
        inMemoryImages.push(...data)
        return images.original.url
      })
  }
  return Promise.resolve(undefined)
}

export default getGiphUseCase
