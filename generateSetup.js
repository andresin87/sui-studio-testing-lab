import React, {createContext} from 'react'
import {render} from '@testing-library/react'
import SUIContext from '@s-ui/react-context'
;(function() {
  if (global.generateSetup) {
    return
  }
  const __CONTEXTS__ = global.__STUDIO_CONTEXTS__ || {}
  global.generateSetup = (Component = () => null, contextSelectorMapper) => (
    props = {}
  ) => {
    let EnhancedComponent = Component
    let ReactContext = null
    if (typeof contextSelectorMapper === 'function') {
      if (!__CONTEXTS__) {
        // eslint-disable-next-line
        console.error(
          `You're trying to use a context but there is no defined context in your contexts.js file`
        )
      } else {
        let reactContextObject = contextSelectorMapper(__CONTEXTS__)
        if (reactContextObject === undefined) {
          console.error(
            `Your trying to use a context which it is not defined in your contexts.js file.
            Only are allow the following contexts: ${Object.keys(__CONTEXTS__)}.
            as fallback you will use the "default" context in your test`
          )
          reactContextObject = __CONTEXTS__.default
        }
        ReactContext = createContext(reactContextObject)
        EnhancedComponent = ownProps => (
          <SUIContext.Provider>
            <Component {...ownProps} />
          </SUIContext.Provider>
        )
      }
    }

    const element = document.createElement('div')
    element.setAttribute('id', 'test-container')

    const utils = render(<EnhancedComponent {...props} />, {
      container: document.body.appendChild(element)
    })

    return {
      ...utils,
      Component: EnhancedComponent,
      Context: ReactContext,
      log: () => console.log(utils.debug())
    }
  }
  const mochaDescribe = global.describe
  global.describe = (...args) => {
    let message = args[0]
    const Component = args.length - 2 > 0 ? args[1] : null
    const contextName = args.length - 3 > 0 ? args[2] : null
    const callback = args[args.length - 1]
    let setup = null
    if (args.length > 2) {
      setup = generateSetup(
        Component,
        contextName ? contexts => contexts[contextName] : null
      )
    }
    mochaDescribe(message, callback.bind(null, setup))
  }
  global.context = global.describe
}.call())
