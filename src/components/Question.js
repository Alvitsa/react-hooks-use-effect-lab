import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Timer that decrements timeRemaining
    const timer = setTimeout(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          // Trigger onAnswered when timer hits 0
          onAnswered(false);
          return 10; // Reset timer for the next question
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup function to clear the timeout on unmount or re-render
    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset the timer
    onAnswered(isCorrect); // Pass whether the answer was correct
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;