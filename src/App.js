import React from "react";
import QuizPage from "./components/QuizPage";
import LandingPage from "./components/LandingPage";
import "./App.css";

export default function App() {
  const [landingPage, setLandingPage] = React.useState(true);

  return (
    <main>
      {landingPage && <LandingPage handleStart={() => setLandingPage(false)} />}
      {!landingPage && <QuizPage />}
    </main>
  );
}
