/* global LabGiphCard */

import React from 'react'

import chai, {expect} from 'chai'
import chaiDOM from 'chai-dom'
import {render} from '@testing-library/react'

chai.use(chaiDOM)

describe('LabGiphCard', () => {
  it('Render', () => {
    render(<LabGiphCard />)
    expect(true).to.be.eql(false)
  })
})
