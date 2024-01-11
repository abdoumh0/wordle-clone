import React from "react";
import Key from "./Key";
import { Fragment } from "react";
import BR from "./BR";

type Props = {
  currentActive: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
};

export default function keyboard({ currentActive, setInput }: Props) {
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
    <div className="flex flex-wrap justify-center">
      {layout.map((v, i) => {
        return (
          <Fragment key={i}>
            <Key
              label={v}
              disabled={false}
              active={currentActive.toUpperCase() == v}
              setInput={setInput}
            />
            {v.toUpperCase() == "P" && (
              <>
                <Key
                  label="Delete"
                  disabled={false}
                  active={
                    currentActive == "Delete" || currentActive == "Backspace"
                  }
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
        active={currentActive == "Enter"}
        setInput={setInput}
      />
    </div>
  );
}
