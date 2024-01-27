"use client";
import React, { useEffect, useState } from "react";
import Keyboard from "@/components/Keyboard";
import Grid from "@/components/Grid";
import Header from "@/components/Header";
import data from "@/lib/words.json";

type Props = {};

export default function page({}: Props) {
  const [input, setInput] = useState(["", "", "", "", "", ""]);
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [word, setWord] = useState<string>("");
  const [allowed, setAllowed] = useState<string[]>([]);
  const [restart, toggleRestart] = useState(false);
  const [pattern, setPattern] = useState<number[]>([0, 0, 0, 0, 0]);

  useEffect(() => {
    setWord(data.allowed[Math.floor(Math.random() * data.allowed.length)]);
    setCurrentRow(0);
    setInput(["", "", "", "", "", ""]);
    console.log(pattern);
  }, [restart]);

  useEffect(() => {
    setCurrentRow((prev) => {
      if (prev < 5 && input[currentRow].length == 5) {
        return prev + 1;
      } else {
        return prev;
      }
    });
  }, [pattern]);

  return (
    <div className="Page flex flex-col justify-between gap-3 h-[100dvh]">
      <Header toggleRestart={toggleRestart} />
      <Grid
        input={input}
        currentRow={currentRow}
        allowed={allowed}
        setAllowed={setAllowed}
        word={word}
        allowed_list={data.allowed}
        pattern={pattern}
        restart={restart}
      />
      <Keyboard
        setInput={setInput}
        input={input}
        setCurrentRow={setCurrentRow}
        currentRow={currentRow}
        allowed={allowed}
        word={word}
        setPattern={setPattern}
      />
    </div>
  );
}
