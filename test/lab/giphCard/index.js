/* global LabGiphCard */

import React from 'react'
import ReactDOM from 'react-dom'

import chai, {expect} from 'chai'
import chaiDOM from 'chai-dom'
import {render} from '@testing-library/react'

chai.use(chaiDOM)

const setup = (props = {}) => {
  const element = document.createElement('div')
  element.setAttribute('id', 'test-container')
  return render(<LabGiphCard {...props} />, {
    container: document.body.appendChild(element)
  })
}

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
    const {container} = setup(props)

    // Then
    expect(container).to.not.be.null
  })

  it('should render text and image', async () => {
    // Given
    const props = {
      url: 'https://media1.giphy.com/media/Ok8r4XMtqTj3O/giphy.gif',
      text: "I don't need debug my code I USE TDD"
    }

    // When
    const {container, debug, ...otherTools} = setup(props)
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
    const {
      rerender,
      getByText,
      queryByText,
      getByAltText,
      queryByAltText
    } = otherTools

    // Then
    console.log(debug()) // Debug usage 😏
    expect(getByText(props.text).innerText).to.be.equal(props.text)
    expect(getByAltText(props.text).alt).to.be.equal(props.text)
    expect(getByAltText(props.text).src).to.be.equal(props.url)

    // But
    // Given
    const nextProps = {
      url: 'https://media1.giphy.com/media/l6TD7USKX0QIo/giphy.gif',
      text: 'I need to debug my code now'
    }

    // When
    await rerender(<LabGiphCard {...nextProps} />)

    // Then
    expect(queryByText(props.text)).to.be.null
    expect(queryByAltText(props.text)).to.be.null

    // And
    expect(getByText(nextProps.text).innerText).to.be.equal(nextProps.text)
    expect(getByAltText(nextProps.text).alt).to.be.equal(nextProps.text)
    expect(getByAltText(nextProps.text).src).to.be.equal(nextProps.url)
  })
})
