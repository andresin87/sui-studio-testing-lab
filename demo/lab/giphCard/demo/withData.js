import React, {useState, useEffect} from 'react'

import getGiphUseCase from './getGiphUseCase'
import getJokeUseCase from './getJokeUseCase'

const getData = async () => {
  const joke = await getJokeUseCase()
  const hasJoke = Boolean(joke.length)

  if (!hasJoke) return {}

  const giphUrl = await getGiphUseCase(joke)

  return {
    text: joke,
    url: giphUrl
  }
}

const withData = Component => ({children, ...otherProps}) => {
  const [data, setData] = useState()
  const _handleOnClick = () => {
    getGiphUseCase(data.joke).then(giphUrl => {
      setData({
        ...data,
        url: giphUrl
      })
    })
  }

  useEffect(() => {
    getData().then(setData)
  }, [])

  return <Component {...data} handleOnClick={_handleOnClick} {...otherProps} />
}

export default withData
