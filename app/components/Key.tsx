"use client";
import React, { useEffect } from "react";

type Props = {
  disabled: boolean;
  label: string;
  active: boolean;
  children?: React.ReactNode;
};

export default function Key({ disabled, label, active, children }: Props) {
  return (
    <div
      className={`flex m-[3px] transition-colors duration-75 bg-gray-50 border-[1px] md:border-gray-300 justify-center align-middle md:p-[5px] rounded overflow-hidden`}
    >
      <kbd>
        <button
          className={`flex md:p-4 px-[10px] bg-gray-100 md:shadow-gray-400 items-center align-middle justify-center text-center ${
            active ? "md:shadow-sm bg-[#e5e6e7]" : "md:translate-y-[-3px]"
          } md:min-w-14 md:min-h-8 min-w-6 min-h-10 ${
            disabled ? "text-gray-600 bg-gray-300" : ""
          } active:bg-[#e5e6e7] md:active:translate-y-0 focus:outline-none`}
          onMouseDown={(e) => {
            window.dispatchEvent(new KeyboardEvent("keydown", { key: label }));
          }}
          onMouseUp={(e) => {
            window.dispatchEvent(new KeyboardEvent("keyup", { key: label }));
          }}
        >
          {children || label}
        </button>
      </kbd>
    </div>
  );
}
