import { useState, useEffect } from 'react';

export default function QuestionTimer({ timeout, onTimeout }) {
  // Время ответа пользователя.
  const [remainingTime, setRemainingTime] = useState(timeout);

  // Ответ не выбран пользователем - переход к след. вопросу.
  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeout();
    }, timeout);
    // Срабатывает при переиспользовании useEffect и при размонтировании.
    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  // Прогресс бар - перерндер каждую секунду.
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 1000);
    }, 1000);
    // Срабатывает при переиспользовании useEffect и при размонтировании.
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress id='question-time' max={timeout} value={remainingTime} />;
}
