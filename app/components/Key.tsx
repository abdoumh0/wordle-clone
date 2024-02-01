"use client";
import React, { useEffect } from "react";

type Props = {
  disabled: boolean;
  label: string;
  active: boolean;
  children?: React.ReactNode;
};

export default function Key({ disabled, label, active, children }: Props) {
  useEffect(() => {}, [disabled]);
  return (
    <div
      className={`flex m-[3px] bg-gray-50 border-[1px] lg:border-gray-300 justify-center align-middle lg:p-[5px] rounded overflow-hidden`}
    >
      <kbd>
        <button
          className={`flex lg:p-4 px-[10px] bg-gray-100 lg:shadow-gray-400 items-center align-middle justify-center text-center ${
            active && !disabled ? "lg:shadow-sm " : "lg:translate-y-[-3px]"
          } lg:min-w-16 lg:min-h-10 min-w-8 min-h-12 ${
            disabled
              ? "text-gray-600 bg-gray-300 shadow-none lg:translate-y-[0px]"
              : ""
          } lg:disabled:translate-y-0 active:bg-[#e5e6e7] lg:active:translate-y-0 focus:outline-none`}
          onMouseDown={(e) => {
            window.dispatchEvent(new KeyboardEvent("keydown", { key: label }));
          }}
          onMouseUp={(e) => {
            window.dispatchEvent(new KeyboardEvent("keyup"));
          }}
        >
          {children || label}
        </button>
      </kbd>
    </div>
  );
}
