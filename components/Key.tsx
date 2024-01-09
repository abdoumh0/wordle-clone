import React from "react";

type Props = {
  disabled?: boolean;
  label: string;
  active: boolean;
};

export default function Key({ disabled, label, active }: Props) {
  return (
    <button
      disabled={disabled}
      className={`p-4 flex items-center text-center ${
        disabled ? "bg-gray-500" : active ? "bg-gray-200" : "bg-gray-300"
      } rounded min-w-10 min-h-10`}
      onClick={(e) => {
        e.preventDefault();
        console.log(active);
      }}
    >
      {label}
    </button>
  );
}
