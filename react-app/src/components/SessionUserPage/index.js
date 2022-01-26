import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
import ModalCapture from "./EditModalForm";
import CommentsModal from "../Comments/SessionCommentModal";
import '../Explore/Carousels.css'
import { getSessionPhotosThunk } from "../../store/photo";
import {BiLeftArrow, BiRightArrow} from 'react-icons/bi';
// import { FiCamera } from 'react-icons/fi'
import AddPhotoForm from "../SessionUserPage/AddPhotoForm";
import Modal from "react-modal";
import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api';



export default function SessionUserPage() {
const sessionUser = useSelector((state) => state.session?.user);
const id = sessionUser?.id
const dispatch = useDispatch();
const photos = useSelector(store => Object.values(store?.photo))
const [ picture, setPicture ] = useState(0)
const length = photos.length;
const [ modalIsOpen, setModalIsOpen ] = useState(false)





useEffect(() => {
    dispatch(getSessionPhotosThunk(id))
    return
}, [dispatch, id])

let locationArray = []

const locationMap = () => {
    photos?.map(photo => {
      let oneLatitude = photo?.geo_location?.split(',')[0]
      let oneLongitude = photo?.geo_location?.split(',')[1]
      oneLatitude = +oneLatitude
      oneLongitude = +oneLongitude
      locationArray.push({lat:oneLatitude,lng:oneLongitude})
      return
    })
}
locationMap()


const [currentPosition, setCurrentPosition] = useState(locationArray[0])

const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
  })
  
  const containerStyle = {
    width: '400px',
    height: '250px'
  };

  const [map, setMap] = useState(null)

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])


const nextSlide = () => {
    setPicture(picture === length - 1 ? 0 : picture + 1)
    setCurrentPosition(locationArray[picture === length - 1 ? 0 : picture + 1])
}

const prevSlide = () => {
    setPicture(picture === 0 ? length -1 : picture - 1)
    setCurrentPosition(locationArray[picture === 0 ? length -1 : picture - 1])
}

Modal.setAppElement('#root')
return (
<section id="grandfather">
    {!photos.length && 
    <div style={{ width:'100%'}}>
        <h1 className="no-photos">Your photos will appear here!</h1>
        {sessionUser &&         
        <div className="add-photo-modal">
            <button className="add-modal-button-no-photos" id="upload-no-photos" onClick={() => setModalIsOpen(true)}>...Upload a Photo</button>
                 <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                    <AddPhotoForm />
              {/* <button className="modal-button" onClick={() => setModalIsOpen(false)}>Close</button> */}
                </Modal>
        </div>}
    </div>}
    <div className="carousel">
        {photos?.length &&
            <div>
                <BiLeftArrow className="left-arrow" onClick={prevSlide}/>
                <BiRightArrow className="right-arrow" onClick={nextSlide}/>
            </div>
        }
    {photos?.length && photos?.map((photo, index) => {

        return (
            <div className={index === picture ? 'slide active' : 'slide'} key={index}>
                <div className="inner">
              {index === picture && (<img src={photo?.url} alt='travel' className="current-image"></img>)}
              {sessionUser &&  <h2 className="photographer-name">Photo by {sessionUser?.username?.split("")[0].toUpperCase() + sessionUser?.username?.slice(1)}</h2>}
              <h3 className="location-name">{photo?.place_name}</h3>
              <h5 className="description-text"><hr className="carousel-hr"></hr>{photo?.description}<hr className="carousel-hr"></hr></h5>
                </div>
                <ModalCapture photo={photos[picture]} />
                <CommentsModal photo={photos[picture]} />
                <div className="map_page__container">
                <div id="map-page-container-inner" style={{ height: '300px', width: '300px' }}>
                {isLoaded && currentPosition ?<GoogleMap
                    mapContainerStyle={containerStyle}
                    zoom={12}
                    center={currentPosition}
                    onUnmount={onUnmount}
                    >
                <InfoWindow position={currentPosition} >
                    <div>
                        <span style={{color: `blue`}}>{sessionUser?.username?.split("")[0].toUpperCase() + sessionUser?.username?.slice(1)}</span>
                    </div>
                </InfoWindow>
                </GoogleMap>:null}
                </div>
                </div>
                {sessionUser &&         
                <div className="add-photo-modal">
                    <button className="add-modal-button" id="upload-photos" onClick={() => setModalIsOpen(true)}>...Upload a Photo</button>
                        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
                        style={{
                            overlay: {
                                position: 'fixed',
                                top: 100,
                                left: 150,
                                right: 50,
                                bottom: 100,
                                backgroundColor: 'rgba(1, 1, 1, 0.750.33)'
                            },
                            content: {
                                position: 'absolute',
                                top: '15%',
                                left: '55%',
                                right: '10%',
                                bottom: '5%',
                                border: '5px solid #BBA084',
                                background: '#fff',
                                overflow: 'auto',
                                WebkitOverflowScrolling: 'touch',
                                borderRadius: '6px',
                                outline: 'none',
                                padding: '20px',
                                backgroundColor: '#F5F5F5',
                              }
                            
                        }}
                        >
                            <AddPhotoForm />
                    {/* <button className="modal-button" onClick={() => setModalIsOpen(false)}>Close</button> */}
                        </Modal>
                </div>}
            </div>
        )
    })}
        
    </div>

    
</section>
)
}