import React from 'react'

import { observer } from 'mobx-react'
import Image from 'react-bootstrap/Image'


/**
 * QDistribution chart
 * @param {object} props 
 */
const Card = (observer((props) => {
  const title = props.title || ''
  return (<div className="main-block">
      {props.isEditMode && <Image className="dshb-drag-icon" src="assets/dragdrop_button.png" rounded />}
      {props.isEditMode && <Image className="dshb-close-icon" src="assets/close_button.png" rounded 
        onClick={props.onRemoveItem}/>}
      <div>{title}</div>
      {props.children}
  </div>)
}))

export default Card