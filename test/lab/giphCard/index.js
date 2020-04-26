/* global LabGiphCard */

import React from 'react'
import ReactDOM from 'react-dom'

import chai, {expect} from 'chai'
import chaiDOM from 'chai-dom'
import {render} from '@testing-library/react'

chai.use(chaiDOM)

describe('LabGiphCard', () => {
  it('should render without crashing', () => {
    // Given
    const props = {}

    // When
    const component = <LabGiphCard {...props} />

    // Then
    const div = document.createElement('div')
    ReactDOM.render(component, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should NOT render null', () => {
    // Given
    const props = {}

    // When
    const {container} = render(<LabGiphCard {...props} />)

    // Then
    expect(container).to.not.be.null
  })
})
