"use client";
import React, { useState } from "react";
import Keyboard from "@/components/Keyboard";
import Grid from "@/components/Grid";

type Props = {};

export default function page({}: Props) {
  const [input, setInput] = useState(["", "", "", "", "", ""]);
  const [currentRow, setCurrentRow] = useState<number>(0);

  return (
    <div>
      <div className="mx-auto top-0 text-6xl text-center py-4 font-mono font-extrabold select-none">
        Wordle
      </div>
      <Grid input={input} currentRow={currentRow} />
      <div className="min-h-8 text-center">{input[currentRow]}</div>
      <Keyboard
        setInput={setInput}
        input={input}
        setCurrentRow={setCurrentRow}
        currentRow={currentRow}
      />
    </div>
  );
}
