import React, { useState } from "react";
import OneQuiz from "./OneQuiz";
import ShowAnswers from "./ShowAnswers";
import blobYellow from "../images/blobYellow.png";
import blobBlue from "../images/blobBlue.png";

export default function QuizPage() {
  const [quizArr, setQuizArr] = useState([]);
  const [tries, setTries] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const [rendered, setRendered] = useState(false);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((res) => createQuizzes(res.results));
  }, [tries]);

  function createQuizzes(rawQuizzes) {
    setQuizArr(
      rawQuizzes.map((item) => ({
        question: parseHTML(item.question),
        answers: getAllAnswers(item.correct_answer, item.incorrect_answers),
        correctAnswer: item.correct_answer,
        selectedAnswer: "",
      }))
    );
    setRendered(true);
  }

  function getAllAnswers(correct, incorrect) {
    const allAnswers = [];
    const rand = Math.floor(Math.random() * (incorrect.length + 1));
    let j = 0;
    for (let i = 0; i < incorrect.length + 1; i++) {
      if (i === rand) {
        allAnswers.push(parseHTML(correct));
      } else {
        allAnswers.push(parseHTML(incorrect[j]));
        j++;
      }
    }
    return allAnswers;
  }

  function parseHTML(data) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");
    return doc.documentElement.textContent;
  }

  function handleClickAnswer(question, answer) {
    setQuizArr((prevQuizArr) =>
      prevQuizArr.map((quiz) =>
        quiz.question === question ? { ...quiz, selectedAnswer: answer } : quiz
      )
    );
  }

  function handleCheckAnswers() {
    let correct = 0;
    let completed = true;
    quizArr.forEach((quiz) => {
      if (!quiz.selectedAnswer) {
        completed = false;
      }
      if (quiz.selectedAnswer === quiz.correctAnswer) {
        correct++;
      }
    });
    setCorrectCount(correct);
    setDone((prevDone) => {
      if (completed && !prevDone) {
        return true;
      }
    });
  }

  function handlePlayAgain() {
    setQuizArr([]);
    setDone(false);
    if (!isNaN(tries)) {
      setTries((prev) => prev + 1);
    }
    setRendered(false);
  }

  return (
    <div className="quiz--page-container">
      <img src={blobYellow} alt="yellow blob" className="blob--yellow" />
      {quizArr.map((quiz) => (
        <OneQuiz
          key={quiz.question}
          quiz={quiz}
          handleClickAnswer={handleClickAnswer}
          done={done}
        />
      ))}
      {done && (
        <ShowAnswers
          correctCount={correctCount}
          totalAnswers={5}
          handlePlayAgain={handlePlayAgain}
        />
      )}
      {rendered && !done && (
        <button className="check--answers" onClick={handleCheckAnswers}>
          Check answers
        </button>
      )}
      <img src={blobBlue} alt="blue blob" className="blob--blue" />
    </div>
  );
}
