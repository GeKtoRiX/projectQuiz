import { useState } from 'react';
import QUESTIONS from '@/data/questions.js';
import Answers from './Answers.jsx';
import QuestionTimer from './QuestionTimer.jsx';

export default function Question({ index, handleSelectAnswerMain, handleSkipAnswer }) {
  // Хранение и проверка ответа пользователя.
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  });

  // Время таймера ответа.
  let timer = 3000;

  // Таймер рендера выделения ответа пользователя.
  if (answer.selectedAnswer) {
    timer = 1000;
  }
  // Таймер проверки и стилизации ответа пользователя.
  if (answer.isCorrect != null) {
    timer = 2000;
  }
  // Стилизация ответа пользователя и добавления ответа пользователя в массив ответов.
  function handleSelectAnswer(answer) {
    // Выделение ответа пользователя.
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    // Проверка и стилизация ответа пользователя.
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });
      // Добавления ответа пользователя в массив ответов.
      setTimeout(() => {
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
        userAnswer={answer.selectedAnswer}
        answerState={answerState}
        currentQuestionAnswers={QUESTIONS[index].answers}
        handleSelectAnswer={handleSelectAnswer}
      />
      {
        <QuestionTimer
          key={timer}
          timeout={timer}
          onTimeout={answer.selectedAnswer === '' ? handleSkipAnswer : null}
        />
      }
    </div>
  );
}
