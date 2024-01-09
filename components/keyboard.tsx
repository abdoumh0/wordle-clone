import React from "react";
import Key from "./Key";

type Props = {
  currentActive: string;
};

export default function keyboard({ currentActive }: Props) {
  return (
    <Key
      label="Enter"
      disabled={false}
      active={currentActive == "Enter" ? true : false}
    />
  );
}
