import './About.css'
import React from 'react'
import { BsGithub, BsLinkedin } from 'react-icons/bs'


export default function AboutPage() {


    return (
    <div className="about-container">
        <div className="Title">
        <hr className="hr"></hr>
        <h1 className="headers">~ About the Developer ~</h1>
        <hr className="hr"></hr>
        <h4 className="text">~ Christopher Felix ~</h4>
            <p className="text"> I am a graduate from appAcademy studying full stack web development.<br />
                I am an American-French dual national originally from Tillamook, Oregon. I currently live in Big Bear, California.
             </p> <br />
             <label className="text">Github:    </label>
             <a  className="link" href="https://github.com/thesavoyard77"><BsGithub /></a> <br />
             <label className="text">Linkedin: </label>
             <a className="link" href="https://www.linkedin.com/in/christopher-felix-a7a25a51"><BsLinkedin /></a> <br />
             <label className="text">This Project:    </label>
             <a  className="link" href="https://github.com/thesavoyard77/Nomad-Photographers"><BsGithub /></a> <br />


             <hr className="hr"></hr>
        </div>
        <div className="Links">
            <h2 className="headers">~ About the Project ~</h2>
            <hr className="hr"></hr>
            <p className="text"> As a capstone project I wanted to push my limits and add as much of a dynamic element as possible. <br />
             While the project is not finished once turned in, it is a suitable challenge to display all I have learned at appAcademy. <br />
             By the time the project is finished, it will incorporate a fully interactive UI and completely dynamic user pages.
             </p> <br />
        </div>
        <div className="Description">

       
        </div>
      </div>
    )
}