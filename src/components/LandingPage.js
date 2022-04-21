import React from "react";
import blob from "../images/blobYellow.png";

export default function LandingPage(props) {
  return (
    <div className="landingpage--container">
      <img src={blob} alt="yellow blob" className="blob--yellow-big" />
      <h2 className="landingpage--title">Quizzical</h2>
      <h3 className="landingpage--subtitle">"The most fun ever"</h3>
      <div className="landingpage--CTA">See if you can play just one round</div>
      <button className="landingpage--start" onClick={props.handleStart}>
        Start Quiz
      </button>
    </div>
  );
}
