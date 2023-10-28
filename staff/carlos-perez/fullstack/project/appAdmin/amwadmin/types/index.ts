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

  export interface EventProps{
    _id: string;
    author: string;
    title: string;
    eventDate: Date;
    location: string;
    text: string;
    links: string[];
    date: Date;
  }

  export interface CalendarDayProps{
   day: string;
   month: string;
   dayNumber: number;
  }

  export interface MessageProps{
    _id: string;
    author: string,
	  email: string,
	  title: string,
	  text: string,
    date: Date,
	  status: boolean
  }