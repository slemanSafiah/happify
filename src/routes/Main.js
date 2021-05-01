import React from "react";
import { Jumbotron } from "react-bootstrap";
import img from "../assets/stats.svg"

const Main = (props) => {
  return (
    <div className="bg-img page-container">
      <Jumbotron>
        <h1>Happify</h1>
        <p>
          React-based web application to allow users to view and analyse
          ‘happiness survey’ data drawn from a database exposed via a REST API.
        </p>
      </Jumbotron>
        <img className='hero-img' src={img} alt={'stats'} ></img>
    </div>
  );
};

export default Main;
