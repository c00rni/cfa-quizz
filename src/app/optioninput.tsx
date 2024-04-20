import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { Quizz } from "./question";
import Image from "next/image";

interface OptionInputProps {
  label: string;
  className?: string;
  children?: ReactNode;
  key: React.Key;
  selection: string;
  setSelection: Dispatch<SetStateAction<string>>;
  state: any;
}

// Display option of a question
export default function OptionInput({
  label,
  children,
  className,
  selection,
  setSelection,
  state,
}: OptionInputProps) {
  return (
    <>
      <div
        onClick={() =>
          !state.questions[state.current].submited && setSelection(label)
        }
        className={`${className} flex items-center p-4 group gap-8 rounded-[12px] sm:rounded-[24px] bg-white shadow ${
          label == selection &&
          !state.questions[state.current].submited &&
          "border-purple border-[3px]"
        } ${
          label == selection &&
          state.questions[state.current].submited &&
          state.questions[state.current].answer == children &&
          "border-green border-[3px]"
        } ${
          state.questions[state.current].submited &&
          label == selection &&
          state.questions[state.current].answer != children &&
          "border-red border-[3px]"
        }`}
      >
        <div
          className={`flex shrink-0 justify-center items-center rounded-[12px] w-[40px] h-[40px] sm:p-7 ${
            !state.questions[state.current].submited &&
            label == selection &&
            "bg-purple text-white"
          }
              ${
                !state.questions[state.current].submited &&
                label != selection &&
                "bg-lightGray text-grayNavy group-hover:text-purple group-hover:bg-purple group-hover:bg-opacity-30"
              } text-regular font-medium uppercase ${
            label == selection &&
            state.questions[state.current].submited &&
            state.questions[state.current].answer == children &&
            "bg-green text-white"
          } ${
            state.questions[state.current].submited &&
            label == selection &&
            state.questions[state.current].answer != children &&
            "bg-red text-white"
          }`}
        >
          {label}
        </div>
        <div className="text-darkHeavy text-regular font-medium ">
          {children}
        </div>
        <div className="flex shrink-0">
          {state.questions[state.current].submited &&
            state.questions[state.current].answer == children && (
              <Image
                sizes="(max-width: 390px) 30px, (max-width: 1200px) 50px"
                src={require("./assets/images/icon-correct.svg")}
                alt="Correct awnser"
              />
            )}
          {state.questions[state.current].submited &&
            state.questions[state.current].answer != children &&
            label == selection && (
              <Image
                sizes="(max-width: 390px) 30px, (max-width: 1200px) 50px"
                src={require("./assets/images/icon-error.svg")}
                alt="Wrong awnser"
              />
            )}
        </div>
      </div>
    </>
  );
}
