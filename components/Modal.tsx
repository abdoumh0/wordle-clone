import Image from "next/image";
import React from "react";

type Props = {
  children: React.ReactNode;
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Modal({ children, toggleOpen }: Props) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="w-fit bg-white rounded min-w-28 min-h-32"
    >
      <div className="flex justify-end items-center p-1">
        <button
          className="p-1"
          onClick={(e) => {
            toggleOpen(false);
          }}
        >
          <Image
            className="pointer-events-none"
            src="x.svg"
            alt="close"
            width={12}
            height={12}
          />
        </button>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}
