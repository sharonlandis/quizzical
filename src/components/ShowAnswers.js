import React from "react"

export default function ShowAnswers(props) {
      
    return (
        <div className="results--center">
            <div className="results">
                <p>You scored correct {props.correctCount}/{props.totalAnswers} answers</p>
                <button onClick={props.handlePlayAgain} className="check--answers">Play again?</button>
            </div>
        </div>
    )
    
    
}    