import React from "react";
import { TailSpin } from "react-loader-spinner";

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <TailSpin
        heigth="200"
        width="200"
        color="#DB3FA1"
        arialLabel="loading"
        className="m-5"
      />

      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;