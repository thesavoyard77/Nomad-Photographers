import { NavLink } from "react-router-dom"
import './Home.css'
export default function Home() {
    
    return (
<div className="outer">
  <div className="introduction">
        <h1 className="splash-title">Nomad-Photographers</h1>
        <p className="splash-text"></p>
        <NavLink className="home-links" to="/about">~About the Developer~</NavLink>
  </div>
  <div className="about">

  </div>
</div>
    )
}