import React, { useEffect, useState } from "react";
import Key from "./Key";
import { Fragment } from "react";
import BR from "./BR";

type Props = {
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setCurrentRow: React.Dispatch<React.SetStateAction<number>>;
};

var isAlpha = function (ch: string) {
  return /^[A-Z]$/i.test(ch);
};

export default function keyboard({ setInput, setCurrentRow }: Props) {
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
      setCurrentRow((prev) => {
        if (prev < 5) {
          return prev + 1;
        } else return prev;
      });
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

  const layout = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
  ];

  return (
    <div className="hidden lg:flex flex-wrap justify-center w-fit bg-black">
      {layout.map((v, i) => {
        return (
          <Fragment key={i}>
            <Key
              label={v}
              disabled={false}
              active={active.toUpperCase() == v}
              setInput={setInput}
            />
            {v.toUpperCase() == "P" && (
              <>
                <Key
                  label="Delete"
                  disabled={false}
                  active={active == "Delete" || active == "Backspace"}
                  setInput={setInput}
                />
                <BR />
              </>
            )}
            {v.toUpperCase() == "L" && <BR />}
          </Fragment>
        );
      })}
      <Key
        label="Enter"
        disabled={false}
        active={active == "Enter"}
        setInput={setInput}
        setCurrentRow={setCurrentRow}
      />
    </div>
  );
}
