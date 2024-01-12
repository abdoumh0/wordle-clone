"use client";
import React, { useEffect, useState } from "react";
import Keyboard from "@/components/Keyboard";
import Grid from "@/components/Grid";

type Props = {};

export default function page({}: Props) {
  const [windowWidth, setWindowWidth] = useState<number>(720);
  const [input, setInput] = useState("");
  const [currentRow, setCurrentRow] = useState<number>(0);

  function resizeHandler() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    resizeHandler();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div>
      {currentRow}
      <Grid input={input} currentRow={currentRow} />
      {input}
      {windowWidth >= 1024 && (
        <Keyboard
          loading={windowWidth < 1024}
          setInput={setInput}
          setCurrentRow={setCurrentRow}
        />
      )}
    </div>
  );
}
