import OptionInput from "./optioninput";
import QuestionButton from "./questionbutton";
import TimeBar from "./timebar";
import { ReactNode } from 'react'

const mockData = [
  {label: "A", text: "4.5 : 1"},
  {label: "B", text: "3 : 1"},
  {label: "C", text: "2.5 : 1"},
  {label: "D", text: "5 : 1"},
]

interface QuestionProps {
  category?: ReactNode,
}


// Display Questions
export default function Question({category}: QuestionProps) {
  let questionText = "Which of these color contrast ratios defines the minimum WCAG 2.1 Level AA requirement for normal text?";
  let score = 8;
  return (
    <>
      {false ? (
        <>
          <div className="flex flex-col gap-6 mt-8">
            <div>
              <p className="text-semiMedium text-grayNavy italic mb-4">Question X of X</p>
              <p className="text-medium font-medium">{questionText}</p>
            </div>
            <TimeBar />
          </div>
          <div className="flex flex-col mt-12 gap-4">
            {mockData.map((item) => <OptionInput key={item.label} label={item.label}>{item.text}</OptionInput>)}
            <QuestionButton />
          </div>
        </>
      ) : (
        <>
          <div className="m-8">
            <h1 className="text-headingRegular font-light">Quiz completed</h1>
            <h1 className="text-headingRegular font-bold">You scored...</h1>
          </div>
          <div className="bg-white flex flex-col py-8 justify-center items-center rounded-[12px]">
            {category}
            <h1 className="text-headingBold font-bold">{score}</h1>
            <p className="text-semiMedium text-grayNavy">out of X</p>
          </div>
          <div className="rounded-[12px] bg-purple text-white text-center font-medium text-regular p-3 mt-4">Play Again</div>
        </>
      )}
  </>
  );
}
