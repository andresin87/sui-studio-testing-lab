import React from 'react'
import PropTypes from 'prop-types'

const LabGiphCard = function({url, text, handleOnClick}) {
  return (
    <aside className="sui-LabGiphCard">
      <img
        src={url}
        alt={text}
        className="sui-GiphCard-image"
        onClick={handleOnClick}
      />
      <div className="sui-GiphCard-content">
        <p className="sui-GiphCard-text">{text}</p>
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
