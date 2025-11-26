import { useState } from 'react';
import QUESTIONS from '@/data/questions.js';
import Answers from './Answers.jsx';
// import QuestionTimer from './QuestionTimer.jsx';

export default function Question({ index, handleSelectAnswerMain, handleSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  });
  // Стилизация ответа пользователя и добавления ответа пользователя в массив ответов.
  function handleSelectAnswer(answer) {
    // Ответ пользователя.
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });
    // Стилизация ответа пользователя
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });
      // Добавления ответа пользователя в массив ответов.
      setTimeout(() => {
        console.log('Ответ пользователя добавлен...');
        handleSelectAnswerMain(answer);
      }, 2000);
    }, 1000);
  }
  // Состояние ответа пользователя.
  let answerState = '';
  // Ответ пользователя.
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  return (
    <div id='question'>
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        lastUserAnswer={answer.selectedAnswer}
        answerState={answerState}
        currentAnswers={QUESTIONS[index].answers}
        handleSelectAnswer={handleSelectAnswer}
      />
      {/* {<QuestionTimer timeout={3000} onTimeout={handleSkipAnswer} />} */}
    </div>
  );
}
