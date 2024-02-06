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
  invalidWordSignal: boolean;
  toggleInvalidWordSignal: React.Dispatch<React.SetStateAction<boolean>>;
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
  invalidWordSignal,
  toggleInvalidWordSignal,
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
    const grid = gridRef.current?.childNodes as NodeListOf<HTMLDivElement>;
    const rows = grid.item(currentRow).childNodes as NodeListOf<HTMLDivElement>;

    const observer = new MutationObserver((mutationsList, observer) => {
      const element = mutationsList[0].target as HTMLDivElement;
      element.style.animationDelay = "0ms";
      element.classList.add("scale");
      element.onanimationstart = () => {}; // otherwise triggers grid color change on "scale" animation
      element.onanimationend = () => {
        element.classList.remove("scale");
      };
    });

    grid.forEach((row) => {
      row.childNodes.forEach((box) => {
        observer.observe(box, {
          characterData: true,
          attributes: false,
          childList: true,
        });
      });
    });

    const bgs = pattern.map((v) => {
      switch (v) {
        case 1:
          return "#27c53f";
        case 2:
          return "#e5c71a";
        case 3:
          return "#474747";
        default:
          return "#F9FAFB";
      }
    });

    rows?.forEach((element, k) => {
      element.style.animationDelay = `${k * 300}ms`;
      if (pattern[k] != 0) {
        element.classList.add("flip");
        element.onanimationstart = (event) => {
          setTimeout(() => {
            element.style.backgroundColor = bgs[k];
            element.style.color = "#ffffff";
          }, 250);
        };
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [pattern]);

  useEffect(() => {
    const row = gridRef.current?.childNodes.item(currentRow)
      .childNodes as NodeListOf<HTMLDivElement>;
    row.forEach((box) => {
      box.style.borderWidth = "2px";
    });
    if (currentRow > 0) {
      const prevRow = gridRef.current?.childNodes.item(currentRow - 1)
        .childNodes as NodeListOf<HTMLDivElement>;
      prevRow.forEach((box) => {
        box.style.borderWidth = "1px";
      });
    }
  }, [currentRow]);

  useEffect(() => {
    const grid = gridRef.current?.querySelectorAll(
      ".box"
    ) as NodeListOf<HTMLDivElement>;
    grid?.forEach((element) => {
      element.style.backgroundColor = "#F9FAFB";
      element.style.color = "#4B5563";
      element.classList.remove("flip");
      element.classList.remove("scale");
    });
  }, [restart]);

  useEffect(() => {
    if (invalidWordSignal) {
      const row = gridRef.current?.childNodes.item(
        currentRow
      ) as HTMLDivElement;
      row.classList.add("shake");
      row.onanimationend = () => {
        row.classList.remove("shake");
        toggleInvalidWordSignal(false);
      };
    }
  }, [invalidWordSignal]);

  return (
    <div className="grid w-fit mx-auto  relative">
      <div ref={gridRef}>
        {grid.map((v, k) => {
          return (
            <div key={k} className={`row flex gap-x-1`}>
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
