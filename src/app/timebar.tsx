
interface TimeBarProps {
    value?: number,
    max?: number,
    className?: string
}

export default function TimeBar({value, max, className}: TimeBarProps) {
  return (
    <>
        <progress className={`${className}`} value={20} max={100} />
    </>
  );
}
