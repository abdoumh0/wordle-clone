"use client";
import React, { useEffect, useState } from "react";
import Key from "./Key";

type Props = {
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setCurrentRow: React.Dispatch<React.SetStateAction<number>>;
  loading?: boolean;
};

var isAlpha = function (ch: string) {
  return /^[A-Z]$/i.test(ch);
};

export default function keyboard({ setInput, setCurrentRow, loading }: Props) {
  const [disabledKeys, setDisabledKeys] = useState<Set<string>>();
  const [active, setActive] = useState<string>("");
  const [ctrlDown, setCtrlDown] = useState(false);

  function activeKeyHandler(e: KeyboardEvent) {
    setActive(e.key);
  }

  function keyUpHandler(e: KeyboardEvent) {
    setActive("");
  }

  function keyDownHandler(e: KeyboardEvent) {
    if (isAlpha(e.key)) {
      setInput((prev) => {
        return prev.concat(e.key.toUpperCase());
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
      setInput((prev) => prev.slice(0, prev.length - 1));
    }
  }

  function submitHandler(e: KeyboardEvent) {
    if (e.key == "Enter") {
      setCurrentRow((prev) => {
        if (prev < 5) {
          return prev + 1;
        } else return prev;
      });
    }
  }

  window.onfocus = (e: FocusEvent) => {
    setCtrlDown(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", CtrlDownHandler);
    window.addEventListener("keyup", CtrlUpHandler);
    if (!ctrlDown) {
      window.addEventListener("keydown", keyDownHandler);
      window.addEventListener("keyup", keyUpHandler);
      window.addEventListener("keydown", backspaceHandler);
      window.addEventListener("keydown", submitHandler);
      window.addEventListener("keydown", activeKeyHandler);
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
    };
  }, [ctrlDown]);

  const layout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  return (
    (!loading && (
      <div className="hidden lg:grid mx-auto w-fit">
        {layout.map((v, k) => {
          return (
            <div key={k} className="flex justify-center items-center">
              {k == 2 && (
                <Key
                  label="Enter"
                  disabled={false}
                  active={active == "Enter"}
                  setInput={setInput}
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
                  ></Key>
                );
              })}
              {k == 2 && (
                <Key
                  label="Delete"
                  disabled={false}
                  active={active == "Delete" || active == "Backspace"}
                  setInput={setInput}
                />
              )}
            </div>
          );
        })}
      </div>
    )) || <div>loading...</div>
  );
}
