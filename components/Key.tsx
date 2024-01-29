import React from "react";

type Props = {
  disabled?: boolean;
  label: string;
  active: boolean;
  children?: React.ReactNode;
};

export default function Key({ disabled, label, active, children }: Props) {
  return (
    <div
      className={`flex m-[3px] bg-gray-50 border-[1px] lg:border-gray-300 justify-center align-middle lg:p-[5px] rounded`}
    >
      <kbd>
        <button
          className={`flex lg:p-4 px-[10px] lg:shadow-gray-400 items-center align-middle justify-center text-center ${
            active
              ? "lg:bg-[#e5e6e7] lg:shadow-sm "
              : "lg:bg-gray-100 lg:translate-y-[-3px]"
          } lg:min-w-16 lg:min-h-10 min-w-8 min-h-12 lg:disabled:bg-gray-300 lg:disabled:shadow-none lg:disabled:translate-y-0 active:bg-[#e5e6e7] lg:active:shadow-sm lg:active:translate-y-0`}
          disabled={disabled}
          onClick={(e) => {
            window.dispatchEvent(new KeyboardEvent("keydown", { key: label }));
          }}
        >
          {children || label}
        </button>
      </kbd>
    </div>
  );
}
