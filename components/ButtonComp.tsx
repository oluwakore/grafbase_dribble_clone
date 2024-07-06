import Image from "next/image";
import { MouseEventHandler, ReactNode } from "react"


type Props = {
  title: string;
  type?: "submit" | "button";
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  isSubmitting?: boolean;
  bgColor?: string;
  textColor?: string;
}

const ButtonComp = ({ title, type, leftIcon, rightIcon, handleClick, isSubmitting, bgColor, textColor }: Props) => {
  return (
    <button
      type={type || 'button'}
      disabled={isSubmitting}
      className={`flexCenter gap-3 px-4 py-3 ${isSubmitting ? 'bg-slate-700' : bgColor || 'bg-black'} rounded-xl ${textColor || 'text-white'}`}
      onClick={handleClick}
    >
      {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left" />}
      {title}
      {rightIcon && <Image src={rightIcon} width={14} height={14} alt="right" />}
    </button>
  )
}

export default ButtonComp