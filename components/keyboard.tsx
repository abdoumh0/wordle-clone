"use client";
import React, { useEffect, useState, useRef } from "react";
import Key from "./Key";
import Image from "next/image";
import { Compare } from "@/lib/compare";

type Props = {
  setInput: React.Dispatch<React.SetStateAction<string[]>>;
  input: string[];
  word: string;
  setCurrentRow: React.Dispatch<React.SetStateAction<number>>;
  currentRow: number;
  allowed: string[];
  setPattern: React.Dispatch<React.SetStateAction<number[]>>;
};

var isAlpha = function (ch: string) {
  return /^[A-Z]$/i.test(ch);
};

export default function keyboard({
  setInput,
  setCurrentRow,
  currentRow,
  input,
  allowed,
  setPattern,
  word,
}: Props) {
  const [disabledKeys, setDisabledKeys] = useState<Set<string>>();
  const [active, setActive] = useState<string>("");
  const [ctrlDown, setCtrlDown] = useState(false);
  const inputRef = useRef<string[]>();
  const allowedRef = useRef<string[]>();
  const crRef = useRef<number>();
  const wordRef = useRef<string>();

  function activeKeyHandler(e: KeyboardEvent) {
    setActive(e.key);
  }

  function keyUpHandler(e: KeyboardEvent) {
    setActive("");
  }

  function keyDownHandler(e: KeyboardEvent) {
    if (isAlpha(e.key)) {
      console.log(input[currentRow]);
      setInput((prev) => {
        return prev.map((v, k) => {
          if (k == currentRow && v.length < 5) {
            return v + e.key.toUpperCase();
          } else return v;
        });
      });
    }
  }

  function CtrlDownHandler(e: KeyboardEvent) {
    if (e.key == "Control") {
      console.log(input);
      setCtrlDown(true);
    }
  }

  function CtrlUpHandler(e: KeyboardEvent) {
    if (e.key == "Control") {
      setCtrlDown(false);
    }
  }

  function backspaceHandler(e: KeyboardEvent) {
    if (e.key == "Backspace" || e.key == "Delete") {
      setInput((prev) => {
        return prev.map((v, k) => {
          if (k == currentRow) {
            return v.slice(0, v.length - 1);
          } else return v;
        });
      });
    }
  }

  function submitHandler(e: KeyboardEvent) {
    if (e.key == "Enter") {
      if (allowedRef.current && inputRef.current && wordRef.current) {
        if (allowedRef.current.length > 0) {
          console.log(word);
          setPattern(
            Compare(wordRef.current, inputRef.current[currentRow].toLowerCase())
          );
          if (
            wordRef.current.toLowerCase() ==
            inputRef.current[currentRow].toLowerCase()
          ) {
            alert("Correct");
          }
          setCurrentRow((prev) => {
            if (
              prev < 5 &&
              inputRef.current &&
              inputRef.current[currentRow].length == 5
            ) {
              return prev + 1;
            } else {
              return prev;
            }
          });
        } else {
          console.log("word invalid");
        }
      }
    }
  }

  function windowFocusHandler(e: FocusEvent) {
    setCtrlDown(false);
  }

  useEffect(() => {
    window.addEventListener("focus", windowFocusHandler);
    window.addEventListener("keydown", CtrlDownHandler);
    window.addEventListener("keyup", CtrlUpHandler);
    if (!ctrlDown) {
      window.addEventListener("keydown", keyDownHandler);
      window.addEventListener("keyup", keyUpHandler);
      window.addEventListener("keydown", backspaceHandler);
      window.addEventListener("keydown", activeKeyHandler);
      window.addEventListener("keydown", submitHandler);
    } else {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
      window.removeEventListener("keydown", backspaceHandler);
      window.removeEventListener("keydown", submitHandler);
      window.removeEventListener("keydown", activeKeyHandler);
    }
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keydown", CtrlDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
      window.removeEventListener("keyup", CtrlUpHandler);
      window.removeEventListener("keydown", backspaceHandler);
      window.removeEventListener("keydown", submitHandler);
      window.removeEventListener("keydown", activeKeyHandler);
      window.removeEventListener("focus", windowFocusHandler);
    };
  }, [ctrlDown, currentRow]);

  useEffect(() => {
    inputRef.current = input;
    allowedRef.current = allowed;
    crRef.current = currentRow;
    wordRef.current = word;
  });

  const layout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  return (
    <div className="Keyboard grid my-auto mx-auto w-fit bottom-4">
      {layout.map((v, k) => {
        return (
          <div key={k} className="flex justify-center items-center">
            {k == 2 && (
              <Key
                label="Enter"
                disabled={false}
                active={active == "Enter"}
                input={input}
                setInput={setInput}
                setCurrentRow={setCurrentRow}
                currentRow={currentRow}
              />
            )}
            {v.map((v_, k_) => {
              return (
                <Key
                  key={k_}
                  label={v_}
                  disabled={false}
                  active={active.toLocaleUpperCase() == v_}
                  setInput={setInput}
                  setCurrentRow={setCurrentRow}
                  currentRow={currentRow}
                ></Key>
              );
            })}
            {k == 2 && (
              <Key
                label="Delete"
                disabled={false}
                active={active == "Delete" || active == "Backspace"}
                setInput={setInput}
                currentRow={currentRow}
                setCurrentRow={setCurrentRow}
              >
                <Image
                  className="pointer-events-none"
                  src="backspace.svg"
                  width={24}
                  height={24}
                  alt="backspace"
                />
              </Key>
            )}
          </div>
        );
      })}
    </div>
  );
}
