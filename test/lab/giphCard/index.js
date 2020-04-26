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

  it('should render text and image', () => {
    // Given
    const props = {
      url: 'https://media1.giphy.com/media/Ok8r4XMtqTj3O/giphy.gif',
      text: "I don't need debug my code I USE TDD"
    }

    // When
    const {container, debug, ...otherTools} = render(<LabGiphCard {...props} />)
    /** Priority [otherTools]
     * - Queries Accessible to Everyone:
     *      getByLabelText,
     *      getByPlaceholderText,
     *      getByRole,
     *      getByText,
     *      getByDisplayValue
     * - Semantic Queries:
     *      getByAltText,
     *      getByTitle
     * - Test IDs:
     *      getByTestId
     * **/
    const {getByText, getByAltText} = otherTools

    // Then
    console.log(debug()) // Debug usage 😏
    expect(getByText(props.text).innerText).to.be.equal(props.text)
    expect(getByAltText(props.text).alt).to.be.equal(props.text)
    expect(getByAltText(props.text).src).to.be.equal(props.url)
  })
})
