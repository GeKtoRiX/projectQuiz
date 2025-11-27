import { useRef } from 'react';

export default function Answers({
  userAnswer,
  answerState,
  currentQuestionAnswers,
  handleSelectAnswer,
}) {
  // Текущий массив перемешанных ответов(Не подвержен перерендеру).
  const shuffledAnswer = useRef();

  // Первичный перемешанный массив ответов.
  if (!shuffledAnswer.current) {
    // Перемешанный массив ответов текущего вопроса.
    shuffledAnswer.current = [...currentQuestionAnswers];
    shuffledAnswer.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id='answers'>
      {shuffledAnswer.current.map((answer) => {
        // Проверка ответа пользователя с вариантами ответа.
        const isSelected = userAnswer === answer;
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
              disabled={answerState !== ''}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
