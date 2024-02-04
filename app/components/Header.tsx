import Image from "next/image";
import Link from "next/link";
import React, { ReactElement } from "react";

type Props = {
  toggleRestart: React.Dispatch<React.SetStateAction<boolean>>;
  pause: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ toggleRestart }: Props) {
  return (
    <div className="header grid">
      <div className="nothing flex px-5 justify-start items-center">
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
            className="pointer-events-none"
          />
        </Link>
      </div>
      <div className="title mx-auto top-0 text-6xl text-center py-4 font-mono font-extrabold select-none">
        Words
      </div>
      <div className="replay-btn flex justify-end items-center px-5">
        <button
          className=" px-2 py-1 "
          onClick={(e) => {
            toggleRestart((prev) => !prev);
            e.currentTarget.blur();
          }}
        >
          <Image
            className="pointer-events-none active:animate-spin"
            src="replay.svg"
            alt="replay"
            width={32}
            height={32}
          />
        </button>
      </div>
    </div>
  );
}
