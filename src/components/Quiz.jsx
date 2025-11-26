import { useCallback, useState } from 'react';
import QUESTIONS from '@/data/questions.js';
import quizCompleteImg from '@/assets/img/quiz-complete.png';
import Question from './Question';

export default function Quiz() {
  // Ответы пользователя.
  const [userAnswers, setUserAnswer] = useState([]);

  // Индекс текущего вопроса.
  const activeQuestionIndex = userAnswers.length;

  // Функция обработки ответа пользователя.
  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    // Добавление ответа пользователя в массив ответов.(Ренрендер).
    setUserAnswer((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }, []);

  // Пропуск ответа пользователя - null
  const handleSkipAnswer = useCallback(() => {
    console.log('Ответ отсутствует...');
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

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
        index={activeQuestionIndex}
        handleSelectAnswerMain={handleSelectAnswer}
        handleSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
