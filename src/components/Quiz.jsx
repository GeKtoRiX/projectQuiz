import { useCallback, useState } from 'react';
import QUESTIONS from '@/data/questions.js';
import Question from './Question.jsx';
import Summary from './Summary.jsx';

export default function Quiz() {
  // Ответы пользователя. []
  const [userAnswers, setUserAnswer] = useState([]);

  // Последний ответ пользователя в массиве(индекс). 0
  const lastUserAnswer = userAnswers.length;

  // Проверка окончания массива вопросов. false
  const quizIsComplete = lastUserAnswer === QUESTIONS.length;

  // Функция добавления ответа пользователя в массив.
  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    // Добавление ответа пользователя в массив ответов.(Ренрендер).
    setUserAnswer((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }, []);

  // Пропуск ответа пользователя - null
  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  // Рендер компонента при окончании вопросов. false
  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id='quiz'>
      <Question
        key={lastUserAnswer}
        index={lastUserAnswer}
        handleSelectAnswerMain={handleSelectAnswer}
        handleSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
