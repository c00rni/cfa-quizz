import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Question } from "./question";

interface TimeBarProps {
  max: number;
  startValue: number;
  className?: string;
  question: Question;
  setQuizz: Dispatch<SetStateAction<string>>;
}

export default function TimeBar({
  startValue,
  max,
  className,
  question,
  setQuizz,
}: TimeBarProps) {
  const [time, setTime] = useState(startValue);

  useEffect(() => {
    setTime(startValue);

    const intervalId = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    const timeoutId = setTimeout(() => {
      console.log("call 1");
      clearInterval(intervalId);
      if (question.submited == false) setQuizz("submit");
    }, max * 1000);

    return () => {
      console.log("call 2");
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [max, question, startValue, setQuizz]);

  return (
    <>
      <progress className={`${className}`} value={time} max={max} />
    </>
  );
}
