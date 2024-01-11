import React from "react";

type Props = {
  disabled?: boolean;
  label: string;
  active: boolean;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setCurrentRow?: React.Dispatch<React.SetStateAction<number>>;
  input?: string;
};

export default function Key({
  disabled,
  label,
  active,
  setInput,
  setCurrentRow,
}: Props) {
  return (
    <div
      className={`flex m-[3px] bg-gray-50 border-[1px] border-gray-300 justify-center align-middle p-[5px] rounded`}
    >
      <kbd className={`key`}>
        <button
          className={`key flex p-4 shadow-gray-400 items-center align-middle justify-center text-center ${
            active
              ? "bg-[#e5e6e7] shadow-sm "
              : "bg-gray-100 translate-y-[-3px]"
          } min-w-16 min-h-10 disabled:bg-gray-300 disabled:shadow-none disabled:translate-y-0 active:bg-[#e5e6e7] active:shadow-sm active:translate-y-0`}
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault();
            console.log(active);
            if (label == "Delete") {
              setInput((prev) => {
                return prev.slice(0, prev.length - 1);
              });
            } else if (label == "Enter") {
              // TODO
              if (setCurrentRow) {
                setCurrentRow((prev) => {
                  if (prev < 5) {
                    return prev + 1;
                  } else return prev;
                });
              }
            } else {
              setInput((prev) => {
                return prev + label;
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
