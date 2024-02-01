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
      <div className="p-3">{children}</div>
    </div>
  );
}
