import { ReactNode } from 'react'
import React, { Dispatch, SetStateAction } from 'react';
import { Category } from './question';
import { getCategoryQuestions } from "./firebase/firebase";

interface CategoyButtonProps {
  category: Category;
  className?: string,
  children?: ReactNode,
  color?: string,
  setQuizzType: Dispatch<SetStateAction<Category | null>>
}



// Display Category button
export default function CategoryButton({category, className, children, color, setQuizzType}: CategoyButtonProps) {

  const handleClick = async () => {
    const questions = await getCategoryQuestions(category);
    const catagoryWithQuestions = {...category, questions};
    setQuizzType(catagoryWithQuestions);
  }

  return (
    <>
        <div className={`${className} flex items-center p-4 gap-8 rounded-[12px] bg-white shadow-md`} onClick={handleClick}>
            <div className={`flex justify-center items-center rounded-[12px] w-[40px] h-[40px] xl:w-[50px] xl:h-[50px] ${color}`}>{children}</div>
            <p className='text-darkHeavy text-regular font-medium '>{category.id}</p>
        </div>
    </>
  );
}
