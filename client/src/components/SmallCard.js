import React from 'react'

import { inject, observer } from 'mobx-react'

/**
 * QDistribution chart
 * @param {object} props 
 */
const SmallCard = inject('authStore')(observer((props) => {
    const title = props.title || 'STAT NAME'
    return   <div className="sb-wrap">
    <p>
        {title}
    </p>
    <p>
        <span className="sb-blue">1,490,390</span> 
        <span className="sb-green">&uarr; 7.49%</span>
    </p>
  </div>
}))

export default SmallCard
