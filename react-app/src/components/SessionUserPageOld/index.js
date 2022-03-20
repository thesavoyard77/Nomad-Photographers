import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
import ModalCapture from "./EditModalForm";
import CommentsModal from "../Comments/SessionCommentModal";
import { getSessionPhotosThunk } from "../../store/photo";
import {BiLeftArrow, BiRightArrow} from 'react-icons/bi';
import mapStyle from "../public/mapStyle";
import AddPhotoForm from "../SessionUserPage/AddPhotoForm";
import Modal from "react-modal";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';



export default function SessionUserPage() {

const sessionUser = useSelector((state) => state.session?.user);
const id = sessionUser?.id
const dispatch = useDispatch();
const photos = useSelector(store => Object.values(store?.photo))
const [ picture, setPicture ] = useState(0)
const length = photos.length;
const [ modalIsOpen, setModalIsOpen ] = useState(false)
let [ key, setKey ] = useState('')


useEffect(() => {
    if (!key) {
        (async () => {
            const response = await fetch('api/photos/key');
            const keyResponse = await response.json();
            setKey(keyResponse);
        })();
    }
});


useEffect(() => {
    dispatch(getSessionPhotosThunk(id))
    return
}, [dispatch, id])

let locationArray = []

const locationMap = () => {
    photos?.map(photo => {
      let geo_location = JSON.parse(photo?.geo_location)
      locationArray.push(geo_location)
      return
    })
}
locationMap()


const [currentPosition, setCurrentPosition] = useState(locationArray[0])
const [ locationPopulated, setLocationPopulated ] = useState(false)

useEffect(() => {
    
    if (locationPopulated === false && locationArray.length > 1) {

    setCurrentPosition(locationArray[0])
    setLocationPopulated(true)
    
    }
},[locationArray, locationPopulated]);

  
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
                <div className="map_page__container-session">
                <div id="map-page-container-inner" style={{ height: '400px', width: '250px' }}>
                {key && currentPosition ?<LoadScript googleMapsApiKey={key.api} > <GoogleMap
                    mapContainerStyle={containerStyle}
                    clickableIcons={true}
                    zoom={12}
                    center={currentPosition}
                    options={{styles: mapStyle, disableDefaultUI: true, fullscreenControl: true}}
                    onUnmount={onUnmount}
                    >
                <Marker 
                    position={currentPosition}
                    title="Camera Icon"
                    streetView={false} />
                </GoogleMap> </LoadScript>:null}
                </div>
                </div>
                {sessionUser &&         
                <div className="add-photo-modal">
                    <button className="add-modal-button" id="upload-photos" onClick={() => setModalIsOpen(true)}>...Upload a Photo</button>
                        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
                        style={{
                            overlay: {
                                position: 'fixed',
                                top: 50,
                                left: -1000,
                                right: 50,
                                bottom: 50,
                                backgroundColor: 'rgba(1, 1, 1, 0.750.33)',
                                zIndex: 5,
                            },
                            content: {
                                position: 'absolute',
                                top: '0%',
                                left: '51%',
                                right: '2%',
                                bottom: '0%',
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