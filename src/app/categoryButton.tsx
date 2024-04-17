import { ReactNode } from 'react'

interface CategoyButtonProps {
    text?: string,
    className?: string,
    children?: ReactNode,
    color?: string
}

// Display Category button
export default function CategoryButton({text, className, children, color}: CategoyButtonProps) {
  return (
    <>
        <div className={`${className} flex items-center p-4 gap-8 rounded-[12px] bg-white`}>
            <div className={`flex justify-center items-center rounded-[12px] w-[40px] h-[40px] ${color}`}>{children}</div>
            <p className='text-darkHeavy text-regular font-medium '>{text}</p>
        </div>
    </>
  );
}
