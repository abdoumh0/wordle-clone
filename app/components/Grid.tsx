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
    const cr = crRef.current || currentRow;
    const grid = gridRef.current?.childNodes as NodeListOf<HTMLDivElement>;
    const row = grid.item(cr).childNodes as NodeListOf<HTMLDivElement>;

    const observer = new MutationObserver(function (
      mutationsList: MutationRecord[],
      observer: MutationObserver
    ) {
      console.log("mo1");
      const mutatedNode = mutationsList[0].target as HTMLDivElement;
      mutatedNode.style.animationDelay = "0ms";
      mutatedNode.classList.add("scale");
      mutatedNode.onanimationend = () => {
        mutatedNode.classList.remove("scale");
        console.log("mo2");
      };
    });
    grid.forEach((row_) => {
      row_.childNodes.forEach((box) => {
        observer.observe(box, {
          characterData: true,
          attributes: false,
          childList: true,
        });
      });
    });

    row?.forEach((e, k) => {
      e.style.animationDelay = `${k * 300}ms`;
      switch (pattern[k]) {
        case 1:
          e.classList.add("flip");
          e.onanimationstart = (event) => {
            setTimeout(() => {
              e.style.backgroundColor = "#27c53f";
              e.style.color = "#ffffff";
            }, 250);
          };
          break;
        case 2:
          e.classList.add("flip");
          e.onanimationstart = (event) => {
            setTimeout(() => {
              e.style.backgroundColor = "#e5c71a";
              e.style.color = "#ffffff";
            }, 250);
          };
          break;
        case 3:
          e.classList.add("flip");
          e.onanimationstart = (event) => {
            setTimeout(() => {
              e.style.backgroundColor = "#e61c19";
              e.style.color = "#ffffff";
            }, 250);
          };
          break;

        default:
          e.style.backgroundColor = "#F9FAFB";
          e.style.color = "#4B5563";
          break;
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [pattern]);

  useEffect(() => {
    const grid = gridRef.current?.querySelectorAll(
      ".box"
    ) as NodeListOf<HTMLDivElement>;
    grid?.forEach((e) => {
      e.style.backgroundColor = "#F9FAFB";
      e.style.color = "#4B5563";
      e.classList.remove("flip");
      e.classList.remove("scale");
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
                    className={`box w-12 h-12 my-1 bg-gray-50 md:w-16 md:h-16 border-[1px] border-gray-700 flex items-center justify-center font-bold text-gray-600 font-sans text-2xl md:text-4xl`}
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
