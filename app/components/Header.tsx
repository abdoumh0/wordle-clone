import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  toggleRestart: React.Dispatch<React.SetStateAction<boolean>>;
  pause: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ toggleRestart }: Props) {
  return (
    <div className="flex justify-between w-full">
      <div className="flex px-5 items-center">
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
      <div className="text-6xl pt-3 font-mono font-extrabold select-none">
        Words
      </div>
      <div className="replay-btn flex items-center px-5">
        <button
          className="px-2 py-1"
          onClick={(e) => {
            toggleRestart((prev) => !prev);
            e.currentTarget.blur();
          }}
        >
          <Image
            onMouseDown={(e) => {
              e.currentTarget.classList.add("image");
            }}
            className="pointer-events-none"
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
