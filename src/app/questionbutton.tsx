import { Dispatch, SetStateAction } from "react";
import { Quizz } from "./question";

interface QuesitonButtonProps {
  state: Quizz;
  setState: Dispatch<SetStateAction<Submition>>;
}

export interface Submition {
  type: string;
  awnser?: string;
}

// Display Question button
export default function QuestionButton({
  state,
  setState,
}: QuesitonButtonProps) {
  return (
    <>
      <div
        onClick={
          state.questions[state.current].submited
            ? () => setState("next")
            : () => setState("submit")
        }
        className="rounded-[12px] sm:rounded-[24px] bg-purple hover:bg-opacity-50 text-white text-center font-medium text-regular p-6"
      >
        {state.questions[state.current].submited
          ? "Next Question"
          : "Submit Answer"}
      </div>
    </>
  );
}
