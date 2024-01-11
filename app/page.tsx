"use client";
import React, { useEffect, useState } from "react";
import Keyboard from "@/components/Keyboard";

type Props = {};
var isAlpha = function (ch: string) {
  return /^[A-Z]$/i.test(ch);
};

export default function page({}: Props) {
  const [input, setInput] = useState("");
  const [disabledKeys, setDisabledKeys] = useState<Set<string>>();
  const [active, setActive] = useState<string>("");

  const word = "HELLO";

  function activeKeyHandler(e: KeyboardEvent) {
    setActive(e.key);
    console.log("active");
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

  function backspaceHandler(e: KeyboardEvent) {
    if (e.key == "Backspace" || e.key == "Delete") {
      setInput((prev) => prev.slice(0, prev.length - 1));
    }
  }

  function submitHandler(e: KeyboardEvent) {
    if (e.key == "Enter") {
      //
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);
    window.addEventListener("keydown", backspaceHandler);
    window.addEventListener("keydown", submitHandler);
    window.addEventListener("keydown", activeKeyHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
      window.removeEventListener("keydown", backspaceHandler);
      window.removeEventListener("keydown", submitHandler);
      window.removeEventListener("keydown", activeKeyHandler);
    };
  }, []);

  return (
    <div>
      {input}
      <Keyboard currentActive={active} setInput={setInput} />
    </div>
  );
}
