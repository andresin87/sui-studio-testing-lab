import React, {createContext} from 'react'
import {render} from '@testing-library/react'
;(function() {
  if (!global.context) {
    return
  }
  const mochaContext = function(
    contextName, // default
    callback // function (context, provider) {}
  ) {
    const __CONTEXTS__ = global.__STUDIO_CONTEXTS__ || {}
    if (!__CONTEXTS__) {
      // eslint-disable-next-line
      console.error(
        `You're trying to use the context ${contextName} but it's not defined in your contexts.js file`
      )
      describe(contextName, callback)
    }
    let initialContext = __CONTEXTS__[contextName]
    if (!initialContext) {
      // eslint-disable-next-line
      console.error(
        `Your trying to use the context ${contextName} but it is not define in your contexts.js file.
          Only are allow the following contexts: ${Object.keys(__CONTEXTS__)}.
          as fallback you will use the "default" context in your test`
      )
      initialContext = __CONTEXTS__.default
    }
    const Context = createContext(initialContext)
    const withContextProvider = Component => props => (
      <Context.Provider>
        <Component {...props} />
      </Context.Provider>
    )
    describe(
      contextName || 'default',
      callback.bind(null, {Context, withContextProvider})
    )
  }
  global.context = mochaContext
  global.generateSetup = (Component = () => null) => (
    props = {},
    HoC = (OwnComponent = Component) => (ownProps = props) => {
      return <OwnComponent {...ownProps} />
    }
  ) => {
    const element = document.createElement('div')
    element.setAttribute('id', 'test-container')
    return render(HoC(Component)(props), {
      container: document.body.appendChild(element)
    })
  }
}.call())
