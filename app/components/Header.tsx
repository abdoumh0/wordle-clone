import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  toggleRestart: React.Dispatch<React.SetStateAction<boolean>>;
  pause: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ toggleRestart }: Props) {
  return (
    <div className="header grid w-full">
      <div className="github flex px-5 items-center">
        <Link
          href="https://github.com/abdoumh0/wordle-clone"
          rel="noopener noreferrer"
          target="_blank"
          onClick={(e) => {
            e.currentTarget.blur();
          }}
        >
          <Image
            src="github-mark.svg"
            alt="github-logo"
            width={32}
            height={32}
            className="pointer-events-none h-auto"
          />
        </Link>
      </div>
      <div className="logo flex items-center justify-center text-6xl py-2 font-mono text-center font-extrabold select-none">
        Words
      </div>
      <div className="replay flex justify-end items-center px-5">
        <button
          className="px-2 py-1 font-mono font-bold text-xl "
          onClick={(e) => {
            toggleRestart((prev) => !prev);
            e.currentTarget.blur();
          }}
        >
          Re
        </button>
      </div>
    </div>
  );
}
