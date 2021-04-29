import React from 'react'
import NavBar from '../layout/Navbar'
import img from '../assets/img.jpg'
import './style.css'
/**
* @author
* @function Main
**/

const Main = (props) => {
    return (
        <>
            <NavBar />
            <img src={img} alt="happy" width="100%" className="img"/>
            <div className="title">
                The Happiness Data App
            </div>
            <div className="text">
                Welcome to the amazing Happiness Data App .
                Tomorrow , and Tomorrow , and Tomorrow ,
                Creeps in this pretty pace from day to day.
            </div>
        </>
    )

}

export default Main