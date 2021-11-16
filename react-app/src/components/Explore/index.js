import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
// import { NavLink } from 'react-router-dom';
import './Carousels.css'
import { getPhotosThunk } from "../../store/photo";
import { getUsersThunk } from "../../store/user";
import {BiLeftArrow, BiRightArrow} from 'react-icons/bi'
import CommentsModal from "../Comments/ExploreCommentsModal";


export default function SessionUserPage() {
// const sessionUser = useSelector((state) => state.session?.user);
const dispatch = useDispatch();
const photos = useSelector(store => Object.values(store?.photo))

const [ picture, setPicture ] = useState(0)
const length = photos.length;
// let id;



useEffect(() => {
    dispatch(getPhotosThunk())
    dispatch(getUsersThunk())
    return
}, [dispatch])

const nextSlide = () => {
    setPicture(picture === length - 1 ? 0 : picture + 1)
    // console.log(picture, "Right Pointer================")
}

const prevSlide = () => {
    setPicture(picture === 0 ? length -1 : picture - 1)
    // console.log(picture, "Left Pointer================")
}


if(!photos.length) {
    return null;
}

// if (sessionUser) {
//     id = sessionUser.id
// }


return (
<section id="grandfather">
    <div className="carousel">
    <BiLeftArrow className="left-arrow" onClick={prevSlide}/>
    <BiRightArrow className="right-arrow" onClick={nextSlide}/>
    {photos?.map((photo, index) => {
      
        return (
            <div className={index === picture ? 'slide active' : 'slide'} key={index}>
                <div className="inner">
              {index === picture && (<img src={photo?.url} alt='travel' className="current-image"></img>)}
                <h2 className="photographer-name">{photo?.users?.username?.split("")[0].toUpperCase() + photo?.users?.username?.slice(1)} </h2>
                <h3 className="location-name">{photo?.place_name}</h3>
              <h5 className="description-text"><hr className="carousel-hr"></hr>{photo?.description}<hr className="carousel-hr"></hr></h5>
                </div>
                {/* {console.log(picture, "inside map=====================")} */}
                <CommentsModal photo={photos[picture]} />
            </div>
        )
    })}

    </div>


</section>
)
}