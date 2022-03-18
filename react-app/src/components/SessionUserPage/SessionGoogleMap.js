import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { getPhotosThunk } from "../../store/photo";
import mapStyle from "../public/mapStyle";

const GoogleMapTest = ({ index, setIndex }) => {

    const dispatch = useDispatch();
    const photos = useSelector(store => Object.values(store?.photo))
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
    
    let locationArray = [];

    

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };

    const locationMap = () => {
        photos?.forEach(photo => {
            let geo_location = JSON.parse(photo?.geo_location)
            locationArray.push(geo_location)
        })
    }
    locationMap()
    
    const [currentPosition, setCurrentPosition] = useState(locationArray[0])
    const [ locationPopulated, setLocationPopulated ] = useState(false)


    useEffect(() => {
        setCurrentPosition(locationArray[index])
    },[index])

    useEffect(() => {
        dispatch(getPhotosThunk())
        return
    }, [dispatch])

    
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

    if(!photos.length) {
        return null;
    }



    return (
        <>
                {key && currentPosition ? <LoadScript googleMapsApiKey={key.api} >
            <GoogleMap
            onSelect={handleSelect}
            mapContainerStyle={containerStyle}
            zoom={12}
            center={currentPosition}
            options={{styles: mapStyle, disableDefaultUI: true, fullscreenControl: true}}
            onUnmount={onUnmount}
            >
            <Marker 
                position={currentPosition}
                title="Camera Marker"
                streetView={false} 
            />
        </GoogleMap> </LoadScript>:null}
        </>
    )
}



export default GoogleMapTest;