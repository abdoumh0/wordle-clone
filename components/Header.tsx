import Image from "next/image";
import React, { useRef } from "react";

type Props = {
  toggleRestart: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ toggleRestart }: Props) {
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="Header grid">
      <div className="nothing"></div>
      <div className="title mx-auto top-0 text-6xl text-center py-4 font-mono font-extrabold select-none">
        Wordle
      </div>
      <div className="replay-btn flex justify-end items-center px-5">
        <button
          ref={btnRef}
          className=" px-2 py-1 "
          onClick={(e) => {
            toggleRestart((prev) => !prev);
            btnRef.current?.blur();
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