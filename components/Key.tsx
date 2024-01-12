import React from "react";

type Props = {
  disabled?: boolean;
  label: string;
  active: boolean;
  setInput: React.Dispatch<React.SetStateAction<string[]>>;
  input?: string[];
  setCurrentRow: React.Dispatch<React.SetStateAction<number>>;
  currentRow: number;
};

export default function Key({
  disabled,
  label,
  active,
  setInput,
  setCurrentRow,
  currentRow,
}: Props) {
  return (
    <div
      className={`flex m-[3px] bg-gray-50 border-[1px] lg:border-gray-300 justify-center align-middle lg:p-[5px] rounded`}
    >
      <kbd>
        <button
          className={` flex p-4 lg:shadow-gray-400 items-center align-middle justify-center text-center ${
            active
              ? "lg:bg-[#e5e6e7] lg:shadow-sm "
              : "lg:bg-gray-100 lg:translate-y-[-3px]"
          } lg:min-w-16 lg:min-h-10 lg:disabled:bg-gray-300 lg:disabled:shadow-none lg:disabled:translate-y-0 lg:active:bg-[#e5e6e7] lg:active:shadow-sm lg:active:translate-y-0`}
          disabled={disabled}
          onClick={(e) => {
            if (label == "Delete") {
              setInput((prev) => {
                return prev.slice(0, prev.length - 1);
              });
            } else if (label == "Enter") {
              console.log("ss");

              setCurrentRow((prev) => {
                if (prev < 5) {
                  return prev + 1;
                } else return prev;
              });
            } else {
              setInput((prev) => {
                prev[currentRow] = prev[currentRow] + label;
                return prev;
              });
            }
          }}
        >
          {label}
        </button>
      </kbd>
    </div>
  );
}
