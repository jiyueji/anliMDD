import React from 'react'
import { observer, useLocalStore } from 'mobx-react'

import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import SmallCard from '../components/SmallCard'
import { useStores } from '../services/StoreUtils'



const AddCardPopup = observer((props) => {

  const store = useLocalStore(
    source => ({
      //show: props.show,
      handleClose: () => {props.closeAddCardHandler()},
      // handleShow: () => {store.show=true},
      galleryItems: []
      }),
    props
  )

  const stores = useStores()

  // console.log('stores', stores, stores.authStore.isAuthenticated)



  // const authStore = this.props.authStore
  // <div>isAuthenticated{authStore.isAuthenticated}</div>


  const responsive = {
    0: { items: 3 },
    1024: { items: 3 },
  }

  const onInititlized = () => {
    store.galleryItems = [1, 2, 3].map((i) => <SmallCard title={i}/>)
  }

  return (
    <React.Fragment>
      {/* <Button variant="primary" onClick={store.handleShow}>
        Launch demo modal
      </Button> */}
      <Modal show={props.show} onHide={store.handleClose} centered={true} size='xl' className="add-card-modal">
        <AliceCarousel
              onInitialized={onInititlized}
              items={store.galleryItems}
              responsive={responsive}
              fadeOutAnimation={true}
              mouseDragEnabled={true}
              playButtonEnabled={false}
              dotsDisabled={true}
              autoHeight={true}
              autoPlay={false}
            />


        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AliceCarousel
            items={store.galleryItems}
            autoPlay={false}
            fadeOutAnimation={true}
            mouseDragEnabled={true}
            playButtonEnabled={false}
            disableAutoPlayOnAction={true}
          />
        </Modal.Body>
        */}
        <Modal.Footer>
          <Button variant="secondary" onClick={store.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={store.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> 
      </Modal>
    </React.Fragment>
  );
})

export default AddCardPopup
