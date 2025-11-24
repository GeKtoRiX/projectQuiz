import { useCallback, useState } from 'react';
import QUESTIONS from '@/data/questions.js';
import quizCompleteImg from '@/assets/img/quiz-complete.png';
import QuestionTimer from './QuestionTimer';

export default function Quiz() {
  // Ответы пользователя.
  const [userAnswer, setUserAnswer] = useState([]);

  // Функция обработки ответа пользователя.
  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    // Добавление ответа пользователя в массив ответов.(Ренрендер).
    setUserAnswer((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }, []);

  // Пропуск ответа пользователя - null
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  console.log(userAnswer);

  // Индекс текущего вопроса.
  const activeQuestionIndex = userAnswer.length;
  // Проверка окончания вопросов.
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  if (quizIsComplete) {
    return (
      <div id='summary'>
        <img src={quizCompleteImg} alt='Trophy Icon' />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  // Перемешанный массив ответов текущего вопроса.
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id='quiz'>
      <div id='question'>
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id='answers'>
          {shuffledAnswers.map((answer) => {
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
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={3000}
          onTimeout={handleSkipAnswer}
        />
      </div>
    </div>
  );
}
