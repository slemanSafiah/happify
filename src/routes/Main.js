import React from "react";
import { Jumbotron } from "react-bootstrap";
/**
 * @author
 * @function Main
 **/

const Main = (props) => {
  return (
    <div className='bg-img page-container'>
      <Jumbotron>
        <h1>The Happiness Data App</h1>
        <p>
        Welcome to the amazing Happiness Data App . Tomorrow , and Tomorrow ,
        and Tomorrow , Creeps in this pretty pace from day to day.
        </p>

      </Jumbotron>

    </div>
  );
};

export default Main;
