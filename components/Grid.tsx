import React, { useEffect, useState, useRef } from "react";
import data from "@/lib/words.json";

type Props = {
  input: string[];
  currentRow: number;
};

export default function Grid({ input, currentRow }: Props) {
  const grid = [
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
  ];

  const [allowed, setAllowed] = useState<string[]>(data.allowed);
  const [inputLength, setInputLength] = useState(input[currentRow].length);
  const alref = useRef<string[]>();
  const inref = useRef<string[]>();

  function listener(e: KeyboardEvent) {
    if (e.key == "²") {
      console.log(alref.current, inref.current);
    }
  }
  useEffect(() => {
    const inputL = input[currentRow].length;
    if (inputLength < inputL) {
      setAllowed(
        allowed.filter(
          (word) =>
            input[currentRow].toLowerCase() ==
            word.slice(0, inputL).toLowerCase()
        )
      );
      console.log("optimized lookup");
      setInputLength(inputL);
    } else {
      setAllowed(
        data.allowed.filter(
          (word) =>
            input[currentRow].toLowerCase() ==
            word.slice(0, inputL).toLowerCase()
        )
      );
      setInputLength(inputL);
    }
    console.log(allowed, input[currentRow]);
  }, [input[currentRow]]);

  useEffect(() => {
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  useEffect(() => {
    alref.current = allowed;
    inref.current = input;
  });

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
                    {input[k_][k]}
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
