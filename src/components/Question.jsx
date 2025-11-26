import Answers from './Answers.jsx';
import QuestionTimer from './QuestionTimer.jsx';

export default function Question({
  userAnswers,
  answerState,
  currentAnswers,
  currentQuestionText,
  handleSelectAnswer,
  handleSkipAnswer,
}) {
  return (
    <div id='question'>
      <h2>{currentQuestionText}</h2>
      <Answers
        userAnswers={userAnswers}
        answerState={answerState}
        currentAnswers={currentAnswers}
        handleSelectAnswer={handleSelectAnswer}
      />
      {<QuestionTimer timeout={3000} onTimeout={handleSkipAnswer} />}
    </div>
  );
}
