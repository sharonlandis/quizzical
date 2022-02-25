import React from "react";
import blob from "../images/blob.png";

export default function LandingPage(props) {
  return (
    <div className="landingpage--container">
      <img src={blob} alt="yellow blob" className="blob--yellow-big" />
      <h2 className="landingpage--title">Quizzical</h2>
      <h3 className="landingpage--subtitle">
        Think you trivia knowledge is good?
      </h3>
      <p className="landingpage--CTA">Try our quiz...</p>
      <button className="landingpage--start" onClick={props.handleStart}>
        Start Quiz
      </button>
    </div>
  );
}
