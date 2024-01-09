"use client";
import React, { useEffect, useState } from "react";

type Props = {};
var isAlpha = function (ch: string) {
  return /^[A-Z]$/i.test(ch);
};

export default function page({}: Props) {
  const [input, setInput] = useState("");

  function keyDownHandler(e: KeyboardEvent) {
    e.preventDefault();
    if (isAlpha(e.key)) {
      setInput((prev) => {
        return prev.concat(e.key);
      });
    }
  }

  function backspaceHandler(e: KeyboardEvent) {
    e.preventDefault();
    if (e.key == "Backspace" || e.key == "Delete") {
      setInput((prev) => prev.slice(0, prev.length - 1));
    }
  }

  function submitHandler(e: KeyboardEvent) {
    e.preventDefault();
    if (e.key == "Enter") {
      //
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keydown", backspaceHandler);
    window.addEventListener("keydown", submitHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keydown", backspaceHandler);
      window.removeEventListener("keydown", submitHandler);
    };
  }, []);

  return <div>{input}</div>;
}
