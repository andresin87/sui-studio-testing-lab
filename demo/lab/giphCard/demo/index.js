import React from 'react'
import LabGiphCard from '../../../../components/lab/giphCard/src'

import withData from './withData'

const BASE_CLASS_DEMO = 'DemoLabGiphCard'
const CLASS_DEMO_SECTION = `${BASE_CLASS_DEMO}-section`

const LabGiphCardWithData = withData(LabGiphCard)

const Demo = () => (
  <div className={BASE_CLASS_DEMO}>
    <h1>
      <code>LabGiphCard</code>
    </h1>
    <h2>Single Selection</h2>
    <div className={CLASS_DEMO_SECTION}>
      <LabGiphCardWithData />
    </div>
  </div>
)

export default Demo
