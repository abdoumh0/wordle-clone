"use client";
import React, { useEffect, useState } from "react";
import Keyboard from "@/components/Keyboard";
import Grid from "@/components/Grid";

type Props = {};

type Point = {
  x: number;
  y: number;
};

export default function page({}: Props) {
  const [windowDimensions, setWindowDimensions] = useState<Point>({
    x: 0,
    y: 0,
  });
  const [input, setInput] = useState("");
  const [currentRow, setCurrentRow] = useState<number>(0);

  function resizeHandler() {
    setWindowDimensions({ x: window.innerWidth, y: window.innerHeight });
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
      {windowDimensions.x >= 1024 && windowDimensions.y >= 680 && (
        <Keyboard setInput={setInput} setCurrentRow={setCurrentRow} />
      )}
    </div>
  );
}
