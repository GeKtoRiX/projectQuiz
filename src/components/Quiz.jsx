import { useState } from 'react';
import QUESTIONS from '@/data/questions.js';

export default function Quiz() {
  // Ответы пользователя.
  const [userAnswer, setUserAnswer] = useState([]);
  // Функция обработки ответа пользователя.
  function handleSelectAnswer(selectedAnswer) {
    setUserAnswer((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }
  // Индекс текущего вопроса.
  const activeQuestionIndex = userAnswer.length;

  return (
    <div id='question'>
      <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
      <ul id='answers'>
        {QUESTIONS[activeQuestionIndex].answers.map((answer) => {
          return (
            <li key={answer} className='answer'>
              <button
                onClick={() => {
                  handleSelectAnswer(answer);
                }}
              >
                {answer}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
