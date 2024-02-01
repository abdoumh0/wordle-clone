import { List } from "postcss/lib/list";
import React, { useEffect, useState, useRef } from "react";

type Props = {
  input: string[];
  currentRow: number;
  allowed: string[];
  setAllowed: React.Dispatch<React.SetStateAction<string[]>>;
  word: string;
  allowed_list: string[];
  pattern: number[];
  restart: boolean;
};

export default function Grid({
  input,
  currentRow,
  allowed,
  setAllowed,
  word,
  allowed_list,
  pattern,
  restart,
}: Props) {
  const grid = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];

  const [inputLength, setInputLength] = useState(input[currentRow].length);
  const alRef = useRef<string[]>();
  const inRef = useRef<string[]>();
  const crRef = useRef<number>();
  const wordRef = useRef<string>();
  const gridRef = useRef<HTMLDivElement>(null);

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
  }, [input[currentRow]]);

  useEffect(() => {
    alRef.current = allowed;
    inRef.current = input;
    crRef.current = currentRow;
    wordRef.current = word;
  }, [allowed, input, currentRow, word]);

  useEffect(() => {
    console.log(allowed);
  }, [allowed]);

  useEffect(() => {
    const cr = crRef.current || currentRow;
    const row = gridRef.current?.childNodes.item(cr)
      .childNodes as NodeListOf<HTMLDivElement>;

    row?.forEach((e, k) => {
      if (true) {
        switch (pattern[k]) {
          case 1:
            e.style.backgroundColor = "#27c53f";
            e.style.color = "#ffffff";
            break;
          case 2:
            e.style.backgroundColor = "#e5c71a";
            e.style.color = "#ffffff";
            break;
          case 3:
            e.style.backgroundColor = "#e61c19";
            e.style.color = "#ffffff";
            break;

          default:
            break;
        }
      }
    });
  }, [pattern]);

  useEffect(() => {
    const grid = gridRef.current?.querySelectorAll(
      ".box"
    ) as NodeListOf<HTMLDivElement>;
    grid?.forEach((e) => {
      e.style.backgroundColor = "#F9FAFB";
      e.style.color = "#4B5563";
    });
  }, [restart]);

  return (
    <div className="grid w-fit mx-auto  relative">
      <div ref={gridRef}>
        {grid.map((v, k) => {
          return (
            <div
              key={k} //TODO set border only when word is invalid
              //TODO change the allowed word list into a bigger one
              className={`row flex gap-x-1 ${
                k == currentRow ? "bg-indigo-50" : ""
              } `}
            >
              {v.map((v_, k_) => {
                return (
                  <div
                    key={k_}
                    className={`box w-12 h-12 my-1 transition-colors bg-gray-50 duration-500 md:w-16 md:h-16 border-[1px] border-gray-700 flex items-center justify-center font-bold text-gray-600 font-sans text-2xl md:text-4xl`}
                  >
                    {input[k][k_]}
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