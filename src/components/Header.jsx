import siteLogo from '@/assets/img/quiz-logo.png';

export default function Header() {
  return (
    <header>
      <img src={siteLogo} alt='Quiz Logo' />
      <h1>ReactQuiz</h1>
    </header>
  );
}
