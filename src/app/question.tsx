import OptionInput from "./optioninput";
import QuestionButton, { Submition } from "./questionbutton";
import TimeBar from "./timebar";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useReducer,
  useState,
} from "react";
import { quizzData } from "./mockdata";
import Image from "next/image";

const label = ["A", "B", "C", "D"];

interface QuestionProps {
  category?: ReactNode;
  quizzType: string;
  setQuizzType: Dispatch<SetStateAction<string>>;
}

export interface Question {
  question?: string;
  options: string[];
  answer?: string;
  time?: number;
  submited?: boolean;
}

export interface Category {
  title: string;
  icon: string;
  questions: Question[];
}

export interface Quizz {
  title: string;
  icon: string;
  color?: string;
  questions: Question[];
  current: number;
  score: number;
  length: number;
}

function initQuizz(category: string): Quizz {
  const data: Category = quizzData.filter(
    (topic) => topic.title.toUpperCase() == category.toUpperCase()
  )[0];
  const quizz: Quizz = {
    ...data,
    current: 0,
    score: 0,
    length: data.questions.length,
    questions: data.questions.map((question) => {
      return { ...question, submited: false };
    }),
  };
  return quizz;
}

// Display Questions
export default function Question({
  category,
  quizzType,
  setQuizzType,
}: QuestionProps) {
  const [selection, setSelection] = useState<string>("");
  const [quizz, setQuizz] = useReducer<any>(reducer, initQuizz(quizzType));
  const { title, icon, color, questions, current, length, score } = quizz;
  const currentQuestion = questions[current];
  const [displayTimeError, setDisplayTimeError] = useState(false);

  function reducer(state: Quizz, action: string) {
    const newState = { ...state };

    switch (action) {
      case "submit":
        newState.questions[state.current].submited = true;

        break;
      case "next":
        const optionIndex = label.indexOf(selection);
        if (state.questions[state.current].submited == true) {
          newState.current += 1;
          if (
            selection != "" &&
            state.questions[state.current].options[optionIndex] ==
              state.questions[state.current].answer
          ) {
            newState.score += 1;
          }
        }
        break;
      default:
    }
    return { ...newState };
  }

  const questionProgressBar = useMemo(() => {
    return (
      <TimeBar
        startValue={0}
        max={currentQuestion?.time}
        question={currentQuestion}
        setQuizz={setQuizz}
      />
    );
  }, [currentQuestion]);

  return (
    <>
      {current < length ? (
        <>
          <div className="flex flex-col gap-6 sm:gap-8 mt-8 xl:mt-0 xl:flex-[1]">
            <div>
              <p className="text-semiMedium text-grayNavy italic mb-4">
                Question {current + 1} of {length}
              </p>
              <p className="text-medium font-medium">
                {currentQuestion.question}
              </p>
            </div>
            {questionProgressBar}
          </div>
          <div className="flex flex-col mt-12 xl:mt-0 sm:mt-20 xl:flex-[1]">
            <div className="flex flex-col gap-4 sm:gap-5">
            {currentQuestion.options.map((option: string, index: number) => {
              return (
                <OptionInput
                  key={index}
                  selection={selection}
                  setSelection={setSelection}
                  label={label[index]}
                  state={quizz}
                >
                  {option}
                </OptionInput>
              );
            })}
            <QuestionButton state={quizz} setState={setQuizz} />
            </div>
           <div
              className={`${
                displayTimeError ? "block" : "hidden"
              } flex items-center justify-center gap-4`}
            >
              <Image
                width={40}
                height={40}
                src={require("./assets/images/icon-error.svg")}
                alt="Error"
              />
              <p className="text-red text-regular">Please select an answer</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="m-8 xl:flex-1">
            <h1 className="text-headingRegular font-light">Quiz completed</h1>
            <h1 className="text-headingRegular font-bold">You scored...</h1>
          </div>
          <div className="xl:flex-1">
            <div className="bg-white flex flex-col py-8 justify-center items-center rounded-[12px] sm:rounded-[24px]">
              {category}
              <h1 className="text-headingBold font-bold">{score}</h1>
              <p className="text-semiMedium text-grayNavy">out of {length}</p>
            </div>
            <div
              onClick={() => setQuizzType("")}
              className="rounded-[12px] sm:rounded-[24px] bg-purple text-white text-center font-medium text-regular p-3 mt-4 sm:mt-8"
            >
              Play Again
            </div>
          </div>
       </>
      )}
    </>
  );
}
