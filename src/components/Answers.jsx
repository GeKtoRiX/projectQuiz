import { useRef } from 'react';

export default function Answers({
  userAnswers,
  answerState,
  currentAnswers,
  handleSelectAnswer,
}) {
  // Текущий массив перемешанных ответов(Не подвержен перерендеру).
  const shuffledAnswer = useRef();
  // Последний(текущий) ответ пользователя на вопрос.
  const lastUserAnswer = userAnswers[userAnswers.length - 1];

  // Первичный перемешанный массив ответов.
  if (!shuffledAnswer.current) {
    // Перемешанный массив ответов текущего вопроса.
    shuffledAnswer.current = [...currentAnswers];
    shuffledAnswer.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id='answers'>
      {currentAnswers.map((answer) => {
        // Сверка ответа пользователя с вариантами ответа.
        const isSelected = lastUserAnswer === answer;
        let cssClass = '';
        // Выделение выбранного ответа.
        if (answerState === 'answered' && isSelected) {
          cssClass = 'selected';
        }
        // Выделение правильного/неправильного ответа.
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
  );
}
