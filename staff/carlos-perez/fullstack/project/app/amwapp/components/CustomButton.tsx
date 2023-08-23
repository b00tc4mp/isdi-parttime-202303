"use client";

import { CustomButtonProps } from "@/types";

const Button = ({btnType, containerStyles, title, handleClick, textStyles}: CustomButtonProps) => (
  <button
    disabled={false}
    type={btnType || "button"}
    className={`custom-btn ${containerStyles}`}
    onClick={handleClick}
  >
    <span className={`flex-1  ${textStyles}`}>{title}</span>
     
  </button>
);

export default Button;