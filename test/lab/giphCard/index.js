/* global LabGiphCard */
/* global MouseEvent */
/* global generateSetup */

import React from 'react'
import ReactDOM from 'react-dom'

import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chaiDOM from 'chai-dom'
import {fireEvent} from '@testing-library/react'

import '@s-ui/studio/src/patcher-mocha'

import '../../../patchContext'

chai.use(chaiDOM)
chai.use(sinonChai)

const setup = generateSetup(LabGiphCard)

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
    expect(container.innerHTML).to.be.a('string')
    expect(container.innerHTML).to.not.have.lengthOf(0)
  })

  context(null, ({withContextProvider}) => {
    it('should render text and image', async () => {
      // Given
      const props = {
        url: 'https://media1.giphy.com/media/Ok8r4XMtqTj3O/giphy.gif',
        text: "I don't need debug my code I USE TDD"
      }

      // When
      const {container, debug, ...otherTools} = setup(
        props,
        withContextProvider
      )
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
      // console.log(debug()) // Debug usage 😏
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

    // Remembering why we test
    // We write tests to be confident that our application will work when the USER uses them.
    // Think less about the code you are testing and more about the use cases that code supports.
    //   Code Coverage < Use Case Coverage (Kent C.Dots "How to know what to test" Apr.2019)
    // <!-- Wrong KPIs can encourage developers to simply increase "vanity" metrics --> (Alex Lobera "Testing is all about principles" Dic.2019)
  })
})
