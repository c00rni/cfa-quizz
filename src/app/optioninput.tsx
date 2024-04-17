import { Children, ReactNode } from 'react'

interface OptionInputProps {
  label?: string,
  className?: string,
  children?: ReactNode
}

// Display option of a question
export default function OptionInput({label, children, className}: OptionInputProps) {
  return (
    <>
      <div className={`${className} flex items-center p-4 gap-8 rounded-[12px] bg-white`}>
          <div className={`flex justify-center items-center rounded-[12px] w-[40px] h-[40px] bg-lightGray text-grayNavy text-regular font-medium uppercase`}>{label}</div>
          <div className='text-darkHeavy text-regular font-medium '>{children}</div>
      </div>
    </>
  );
}
