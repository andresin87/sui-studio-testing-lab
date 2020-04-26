/* global LabGiphCard */
/* global MouseEvent */

import React from 'react'
import ReactDOM from 'react-dom'

import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chaiDOM from 'chai-dom'
import {render, fireEvent} from '@testing-library/react'

chai.use(chaiDOM)
chai.use(sinonChai)

const setup = (props = {}) => {
  const container = document.createElement('div')
  container.setAttribute('id', 'test-container')
  return render(<LabGiphCard {...props} />, {
    container: document.body.appendChild(container)
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
    const {
      rerender,
      getByText,
      queryByText,
      getByAltText,
      queryByAltText
    } = setup(props)

    // Then
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

  it('should fire onClickHandler event once', async () => {
    // Given
    const spy = sinon.spy()
    const props = {
      url: 'https://media1.giphy.com/media/Ok8r4XMtqTj3O/giphy.gif',
      text: "I don't need debug my code I USE TDD",
      handleOnClick: spy
    }

    // When
    const {getByText, getByAltText} = setup(props)

    // Then
    expect(spy).to.have.callCount(0)

    // And
    // When
    fireEvent(
      getByText(props.text),
      new MouseEvent('click', {
        bubbles: true, // if true, then the event bubbles.
        cancelable: true // if true, then the “default action” may be prevented
      })
    )

    // Then
    expect(spy).to.have.callCount(0)

    // But
    // When
    fireEvent.click(getByAltText(props.text))

    // Then
    expect(spy).to.have.callCount(1)

    // Usage of assertions
    // https://www.chaijs.com/plugins/sinon-chai/
  })
})
