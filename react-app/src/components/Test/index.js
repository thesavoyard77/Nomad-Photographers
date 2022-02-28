import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
import mapStyle from "../SessionUserPage/public/mapStyle";
import './Carousels.css'
import { getPhotosThunk } from "../../store/photo";
import { getUsersThunk } from "../../store/user";
import {BiLeftArrow, BiRightArrow} from 'react-icons/bi'
import CommentsModal from "../Comments/ExploreCommentsModal";
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import "bootstrap/dist/css/bootstrap.css";
import {Carousel} from 'react-bootstrap';


export default function Test() {

    return (
        <div className="test">
            <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=First slide&bg=373940"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Second slide&bg=282c34"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Third slide&bg=20232a"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
        </div>

 )
    
};