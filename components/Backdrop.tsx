import React, { useRef } from "react";
import Modal from "./Modal";

type Props = {
  children: React.ReactNode;
  opacity?: number;
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Backdrop({ children, opacity, toggleOpen }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={backdropRef}
      className="w-[100dvw] h-[100dvh] bg-black/40 absolute z-50 flex justify-center align-middle items-center"
      onClick={(e) => {
        e.stopPropagation();
        toggleOpen(false);
      }}
    >
      <Modal toggleOpen={toggleOpen}>{children}</Modal>
    </div>
  );
}
