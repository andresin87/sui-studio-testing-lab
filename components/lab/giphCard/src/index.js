import React from 'react'
import PropTypes from 'prop-types'

const LabGiphCard = function({url, text, handleOnClick}) {
  const [stateUrl /** , setUrl **/] = useState(url)
  const [stateText /** , setText **/] = useState(text)
  // useEffect(() => { setUrl(url) }, [url])
  // useEffect(() => { setText(text) }, [text])
  return (
    <aside className="sui-LabGiphCard">
      <img
        src={stateUrl}
        alt={stateText}
        className="sui-GiphCard-image"
        onClick={handleOnClick}
      />
      <div className="sui-GiphCard-content">
        <p className="sui-GiphCard-text">{stateText}</p>
      </div>
    </aside>
  )
}

LabGiphCard.displayName = 'LabGiphCard'
LabGiphCard.propTypes = {
  url: PropTypes.string,
  text: PropTypes.text,
  handleOnClick: PropTypes.func
}

export default LabGiphCard
