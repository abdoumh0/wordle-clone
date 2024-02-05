"use client";
import React, { useEffect, useState, useRef } from "react";
import Key from "./Key";
import Image from "next/image";
import { Compare } from "@/app/lib/compare";

type Props = {
  setInput: React.Dispatch<React.SetStateAction<string[]>>;
  input: string[];
  word: string;
  setCurrentRow: React.Dispatch<React.SetStateAction<number>>;
  currentRow: number;
  allowed: string[];
  setPattern: React.Dispatch<React.SetStateAction<number[]>>;
  toggleInvalidWordSignal: React.Dispatch<React.SetStateAction<boolean>>;
  disabled: Set<string>;
  deactivate: boolean;
  gameOver: boolean;
  onGameEnd: React.Dispatch<React.SetStateAction<boolean>>;
  setWinStatus: React.Dispatch<React.SetStateAction<boolean>>;
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
  toggleInvalidWordSignal,
  word,
  disabled,
  deactivate,
  gameOver,
  onGameEnd,
  setWinStatus,
}: Props) {
  const [active, setActive] = useState<Set<string>>(new Set());
  const [ctrlDown, setCtrlDown] = useState(false);
  const inputRef = useRef<string[]>();
  const allowedRef = useRef<string[]>();
  const crRef = useRef<number>();
  const wordRef = useRef<string>();
  const disabledRef = useRef<Set<string>>();

  function activeKeyHandler(e: KeyboardEvent) {
    setActive((prev) => {
      prev.add(e.key.toLowerCase());
      return new Set(prev);
    });
  }

  function keyUpHandler(e: KeyboardEvent) {
    setActive((prev) => {
      prev.delete(e.key.toLowerCase());
      return new Set(prev);
    });
  }

  function keyDownHandler(e: KeyboardEvent) {
    if (isAlpha(e.key)) {
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
        if (allowedRef.current.length == 0) {
          toggleInvalidWordSignal(true);
        } else if (inputRef.current[crRef.current || currentRow].length == 5) {
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
            setActive(new Set());
            setWinStatus(true);
            onGameEnd(true);
          } else if (
            crRef.current &&
            crRef.current == 5 &&
            inputRef.current[crRef.current].length == 5 &&
            wordRef.current.toLowerCase() != inputRef.current[crRef.current]
          ) {
            setActive(new Set());
            setWinStatus(false);
            onGameEnd(true);
          }
        } else {
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
  }, [input, allowed, currentRow, word, disabled]);

  useEffect(() => {}, [allowed]);

  const layout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
  ];

  return (
    <div className="Keyboard grid mb-5 md:w-fit w-[95%]">
      {layout.map((v, k) => {
        return (
          <div key={k} className="flex justify-center items-center">
            {v.map((v_, k_) => {
              return (
                <Key
                  key={k_}
                  label={v_}
                  disabled={disabled.has(v_.toLowerCase())}
                  active={active.has(v_.toLowerCase())}
                >
                  {v_ == "Backspace" && (
                    <Image
                      src="backspace.svg"
                      alt="backspace"
                      width={24}
                      height={24}
                      className="pointer-events-none"
                    />
                  )}
                </Key>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
