import React from "react";

type Props = {
  input?: string;
  currentRow?: number;
};

export default function Grid({ input, currentRow }: Props) {
  const grid = [
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
  ];
  return (
    <div className="w-fit mx-auto my-5">
      <div className="flex gap-x-1">
        {grid.map((v, k) => {
          return (
            <div key={k}>
              {v.map((v_, k_) => {
                return (
                  <div
                    key={k_}
                    className="w-20 h-20 rounded border-[1px] border-gray-400 flex items-center justify-center font-bold text-gray-600 font-sans text-4xl"
                  >
                    {currentRow == k_ && input?.at(k)}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
