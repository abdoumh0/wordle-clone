"use client";
import React, { useEffect, useState, useRef } from "react";
import Key from "./Key";
import Image from "next/image";
import { Compare } from "@/lib/compare";
import { on } from "events";

type Props = {
  setInput: React.Dispatch<React.SetStateAction<string[]>>;
  input: string[];
  word: string;
  setCurrentRow: React.Dispatch<React.SetStateAction<number>>;
  currentRow: number;
  allowed: string[];
  setPattern: React.Dispatch<React.SetStateAction<number[]>>;
  disabled: Set<string>;
  deactivate: boolean;
  gameOver: boolean;
  onGameEnd: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

var isAlpha = function (ch: string) {
  return /^[A-Z]$/i.test(ch);
};

export default function keyboard({
  setInput,
  currentRow,
  input,
  allowed,
  setPattern,
  word,
  disabled,
  deactivate,
  gameOver,
  onGameEnd,
  setMessage,
}: Props) {
  const [active, setActive] = useState<string>("");
  const [ctrlDown, setCtrlDown] = useState(false);
  const inputRef = useRef<string[]>();
  const allowedRef = useRef<string[]>();
  const crRef = useRef<number>();
  const wordRef = useRef<string>();
  const disabledRef = useRef<Set<string>>();

  let word_: string;

  function activeKeyHandler(e: KeyboardEvent) {
    setActive(e.key);
  }

  function keyUpHandler(e: KeyboardEvent) {
    setActive("");
  }

  function keyDownHandler(e: KeyboardEvent) {
    if (isAlpha(e.key)) {
      console.log(input);
      setInput((prev) => {
        return prev.map((v, k) => {
          if (k == crRef.current && v.length < 5) {
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
          if (k == crRef.current) {
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
            Compare(
              wordRef.current,
              inputRef.current[crRef.current || currentRow].toLowerCase()
            )
          );
          if (
            wordRef.current.length == 5 &&
            wordRef.current.toLowerCase() ==
              inputRef.current[crRef.current || currentRow].toLowerCase()
          ) {
            setMessage("You Won");
            onGameEnd(true);
          } else if (
            crRef.current &&
            crRef.current == 5 &&
            wordRef.current.toLowerCase() != inputRef.current[crRef.current]
          ) {
            setMessage("You Lose");
            onGameEnd(true);
          }
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
    if (!ctrlDown && !deactivate && !gameOver) {
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
  }, [ctrlDown, deactivate, gameOver]);

  useEffect(() => {
    inputRef.current = input;
    allowedRef.current = allowed;
    crRef.current = currentRow;
    wordRef.current = word;
    disabledRef.current = disabled;
    word_ = word;
  }, [input, allowed, currentRow, word, disabled]);

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
              <Key label="Enter" disabled={false} active={active == "Enter"} />
            )}
            {v.map((v_, k_) => {
              return (
                <Key
                  key={k_}
                  label={v_}
                  disabled={disabled.has(v_.toLowerCase())}
                  active={active.toLocaleUpperCase() == v_}
                ></Key>
              );
            })}
            {k == 2 && (
              <Key
                label="Backspace"
                disabled={false}
                active={active == "Delete" || active == "Backspace"}
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
