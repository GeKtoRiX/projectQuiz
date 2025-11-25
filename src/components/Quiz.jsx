import { useCallback, useState } from 'react';
import QUESTIONS from '@/data/questions.js';
import quizCompleteImg from '@/assets/img/quiz-complete.png';
import QuestionTimer from './QuestionTimer';

export default function Quiz() {
  // Цветовое выделение ответа пользователя.
  const [answerState, setAnswerState] = useState('');
  // Ответы пользователя.
  const [userAnswer, setUserAnswer] = useState([]);

  // Индекс текущего вопроса.
  const activeQuestionIndex =
    answerState === '' ? userAnswer.length : userAnswer.length - 1;

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

  // Перемешанный массив ответов текущего вопроса.
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);
  // Последний(текущий) ответ пользователя на вопрос.
  const lastUserAnswer = userAnswer[userAnswer.length - 1];

  return (
    <div id='quiz'>
      <div id='question'>
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id='answers'>
          {shuffledAnswers.map((answer) => {
            // Сверка ответа пользователя с вариантов ответа.
            const isSelected = lastUserAnswer === answer;
            let cssClass = '';
            if (answerState === 'answered' && isSelected) {
              cssClass = 'selected';
            }
            if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
              cssClass = answerState;
            }
            return (
              <li key={answer} className='answer'>
                <button
                  className={cssClass}
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
        {/* <QuestionTimer
          key={activeQuestionIndex}
          timeout={3000}
          onTimeout={handleSkipAnswer}
        /> */}
      </div>
    </div>
  );
}
