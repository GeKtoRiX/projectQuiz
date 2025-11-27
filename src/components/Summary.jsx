import QUESTIONS from '@/data/questions.js';
import quizCompleteImg from '@/assets/img/quiz-complete.png';

export default function Summary({ userAnswers }) {
  // Массивы пропущенных, правильных и неправильных ответов.
  const results = {
    skippedAnswers: userAnswers.filter((answer) => answer === null),
    wrongAnswers: userAnswers.filter(
      (answer, index) => answer !== QUESTIONS[index].answers[0]
    ),
    correctAnswers: userAnswers.filter(
      (answer, index) => answer === QUESTIONS[index].answers[0]
    ),
  };

  // Пропущенные ответы.
  const skippedAnswersShare = Math.round(
    (results.skippedAnswers.length / userAnswers.length) * 100
  );
  // Неправильнеы ответы.
  const wrongAnswersShare = Math.round(
    (results.wrongAnswers.length / userAnswers.length) * 100
  );
  // Правильные ответы.
  const correctAnswersShare = Math.round(
    (results.correctAnswers.length / userAnswers.length) * 100
  );

  return (
    <div id='summary'>
      <img src={quizCompleteImg} alt='Trophy Icon' />
      <h2>Quiz Completed</h2>
      <div id='summary-stats'>
        <p>
          <span className='number'>{skippedAnswersShare}%</span>
          <span className='text'>skipped</span>
        </p>
        <p>
          <span className='number'>{correctAnswersShare}%</span>
          <span className='text'>answered correctly</span>
        </p>
        <p>
          <span className='number'>{wrongAnswersShare}%</span>
          <span className='text'>answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          // Стиль по умолчанию.
          let cssClass = 'user-answer';
          // Ответ пропущен.
          if (answer === null) {
            cssClass += ' skipped';
            // Ответ не правильный.
          } else if (answer !== QUESTIONS[index].answers[0]) {
            cssClass += ' wrong';
            // Ответ правильный.
          } else {
            cssClass += ' correct';
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className='question'>{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? 'Нет ответа'}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
