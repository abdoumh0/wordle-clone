import React, { useEffect, useState, useRef } from "react";

type Props = {
  input: string[];
  currentRow: number;
  allowed: string[];
  setAllowed: React.Dispatch<React.SetStateAction<string[]>>;
  word: string;
  allowed_list: string[];
  pattern: number[];
};

export default function Grid({
  input,
  currentRow,
  allowed,
  setAllowed,
  word,
  allowed_list,
  pattern,
}: Props) {
  const grid = [
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
  ];

  const [inputLength, setInputLength] = useState(input[currentRow].length);
  const alRef = useRef<string[]>();
  const inRef = useRef<string[]>();
  const crRef = useRef<number>();
  const wordRef = useRef<string>();
  const gridRef = useRef<HTMLDivElement>(null);

  function listener(e: KeyboardEvent) {
    if (e.key == "²") {
      console.log(wordRef.current);
      console.log(alRef.current, inRef.current?.at(crRef.current || 0));
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
        allowed_list.filter(
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
    alRef.current = allowed;
    inRef.current = input;
    crRef.current = currentRow;
    wordRef.current = word;
  });

  useEffect(() => {
    const cr = crRef.current || currentRow;
    const row = gridRef.current
      ?.querySelectorAll("div")
      .item(cr)
      .querySelectorAll("div");

    console.log(row?.item(0).innerHTML);
    row?.forEach((e, k) => {
      switch (pattern[k]) {
        case 1:
          e.style.backgroundColor = "green";
          break;
        case 2:
          e.style.backgroundColor = "yellow";
          break;
        case 3:
          e.style.backgroundColor = "red";
          break;
        default:
          break;
      }
    });
  }, [pattern]);

  return (
    <div className="Grid overflow-y-scroll w-fit mx-auto my-5">
      <div ref={gridRef} className="flex gap-x-1">
        {grid.map((v, k) => {
          return (
            <div key={k}>
              {v.map((v_, k_) => {
                return (
                  <div
                    key={k_}
                    className={`w-16 h-16 transition-colors duration-100 md:w-20 md:h-20 rounded border-[1px] border-gray-400 flex items-center justify-center font-bold text-gray-600 font-sans text-4xl ${
                      k_ == currentRow ? "bg-indigo-50" : ""
                    }`}
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
