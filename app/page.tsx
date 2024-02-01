"use client";
import React, { useEffect, useState } from "react";
import Keyboard from "./components/Keyboard";
import Grid from "./components/Grid";
import Header from "./components/Header";
import data from "./lib/words.json";
import { resolveDisabled } from "./lib/compare";
import Backdrop from "./components/Backdrop";
import {} from "next/font/google";

type Props = {};

export default function page({}: Props) {
  const [disabled, setDisabled] = useState<Set<string>>(new Set([]));
  const [input, setInput] = useState(["", "", "", "", "", ""]);
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [word, setWord] = useState<string>("");
  const [allowed, setAllowed] = useState<string[]>([]);
  const [restart, toggleRestart] = useState(false);
  const [pattern, setPattern] = useState<number[]>([0, 0, 0, 0, 0]);
  const [paused, pause] = useState<boolean>(false);
  const [open, toggleOpen] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  function EnableAll() {
    setDisabled(new Set());
  }

  useEffect(() => {
    setWord(data.allowed[Math.floor(Math.random() * data.allowed.length)]);
    setCurrentRow(0);
    setInput(["", "", "", "", "", ""]);
    EnableAll();
    pause(false);
    setGameOver(false);
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

  useEffect(() => {
    setDisabled(resolveDisabled(pattern, input[currentRow], disabled));
  }, [pattern]);

  useEffect(() => {
    if (gameOver) {
      const t = setTimeout(() => {
        toggleOpen(true);
      }, 400);
    }
  }, [gameOver]);

  return (
    <div className="Page flex flex-col justify-between gap-3 h-[100dvh]">
      {open && (
        <Backdrop toggleOpen={toggleOpen} pause={pause}>
          <div className="min-w-72 min-h-44 text-center flex flex-col justify-between items-center gap-y-5">
            <h3 className="text-4xl font-bold font-mono">{message}</h3>
            <div className="font-mono">
              word was{" "}
              <p className="text-indigo-700 font-mono text-2xl">{word}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleOpen(false);
                toggleRestart((prev) => !prev);
              }}
              className="rounded bg-green-400 text-center px-2 py-1 text-gray-100 font-mono font-bold"
            >
              Replay
            </button>
          </div>
        </Backdrop>
      )}
      <Header toggleRestart={toggleRestart} pause={pause} />
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
        disabled={disabled}
        deactivate={paused}
        onGameEnd={setGameOver}
        gameOver={gameOver}
        setMessage={setMessage}
      />
    </div>
  );
}
