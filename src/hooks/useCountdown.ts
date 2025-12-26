import { useEffect, useMemo, useState } from 'react';

const useCountdown = (date: string) => {
  const targetTime = new Date(date).getTime(); //+ 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

  const [timeLeft, setTimeLeft] = useState(targetTime - new Date().getTime());

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(targetTime - new Date().getTime());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, targetTime]);

  // Convert milliseconds to Days, Hours, Minutes, and Seconds
  const formatTime = useMemo(() => {
    const totalSeconds = Math.floor(timeLeft / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      hours: hours > 0 ? String(hours).padStart(2, '0') : '00',
      minutes: minutes > 0 ? String(minutes).padStart(2, '0') : '00',
      seconds: seconds > 0 ? String(seconds).padStart(2, '0') : '00',
      days: days > 0 ? String(days).padStart(2, '0') : '00',
    };
  }, [timeLeft]);

  return { formatTime };
};

export default useCountdown;
