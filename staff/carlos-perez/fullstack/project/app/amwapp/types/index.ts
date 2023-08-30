import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    isDisabled?: boolean;
    btnType?: "button" | "submit";
    containerStyles?: string;
    textStyles?: string;
    title: string;
    rightIcon?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
  }

  export interface CustomMenuProps{
    containerStyles?: string;
  }

  export interface UpdateProps{
    _id: string;
    author: string;
    title: string;
    image: string;
    text: string;
    date: Date;
  }

  export interface SongProps{
    _id: string;
    author: string;
    title: string;
    media: string;
    text: string;
    songInfo: string;
    date: Date;
  }