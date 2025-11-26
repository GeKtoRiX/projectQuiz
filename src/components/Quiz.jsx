import { useCallback, useState } from 'react';
import QUESTIONS from '@/data/questions.js';
import quizCompleteImg from '@/assets/img/quiz-complete.png';
import Question from './Question';

export default function Quiz() {
  // Цветовое выделение ответа пользователя.
  const [answerState, setAnswerState] = useState('');
  // Ответы пользователя.
  const [userAnswers, setUserAnswer] = useState([]);

  // Индекс текущего вопроса.
  const activeQuestionIndex =
    answerState === '' ? userAnswers.length : userAnswers.length - 1;

  // Функция обработки ответа пользователя.
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      // Нажатие пользователя на вариант ответа(Ререндер).
      setAnswerState('answered');
      // Добавление ответа пользователя в массив ответов.(Ренрендер).
      setUserAnswer((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });
      // Изменение стиля выбранного ответа в зависимости от правильности ответа.
      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0])
          // Ответ верный(Ререндер).
          setAnswerState('correct');
        else {
          // Ответ не верный(Ререндер).
          setAnswerState('wrong');
        }
        // Отображение стиля выбранного ответа в течение 2 секунд.
        setTimeout(() => {
          console.log('Ответ пользователя обработан...');
          setAnswerState('');
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  // Пропуск ответа пользователя - null
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  console.log(answerState);
  console.log(userAnswers);

  // Проверка окончания вопросов.
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  // Рендер компонента при окончании вопросов.
  if (quizIsComplete) {
    return (
      <div id='summary'>
        <img src={quizCompleteImg} alt='Trophy Icon' />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  return (
    <div id='quiz'>
      <Question
        key={activeQuestionIndex}
        userAnswers={userAnswers}
        answerState={answerState}
        currentQuestionText={QUESTIONS[activeQuestionIndex].text}
        currentAnswers={QUESTIONS[activeQuestionIndex].answers}
        handleSelectAnswer={handleSelectAnswer}
        handleSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
