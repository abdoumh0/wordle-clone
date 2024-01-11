import React from "react";

type Props = {
  disabled?: boolean;
  label: string;
  active: boolean;
  setInput: React.Dispatch<React.SetStateAction<string>>;
};

export default function Key({ disabled, label, active, setInput }: Props) {
  return (
    <div
      className={`flex m-[3px] bg-gray-50 border-[1px] border-gray-300 justify-center align-middle p-[5px] rounded`}
    >
      <kbd className={`key`}>
        <button
          className={`flex p-4 shadow-gray-400 items-center align-middle justify-center text-center ${
            active
              ? "bg-[#ecedef] shadow-sm "
              : "bg-gray-100 translate-y-[-3px]"
          } min-w-16 min-h-10 disabled:bg-gray-300 disabled:shadow-none disabled:translate-y-0 active:bg-[#ecedef] active:shadow-sm active:translate-y-0`}
          disabled={false}
          onClick={(e) => {
            e.preventDefault();
            console.log(active);
            if (label == "Delete") {
              setInput((prev) => {
                return prev.slice(0, prev.length - 1);
              });
            } else if (label == "Enter") {
              // TODO
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
