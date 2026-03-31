import React from "react";
import type { JSX } from "react";
import Bulb from "./components/Bulb";
export default function App(): JSX.Element {
  return (
    <main className="bg-background flex min-h-screen w-full flex-col items-center justify-center gap-5">
      <div className="text-center">
        <h1 className="text-primary text-3xl font-bold tracking-wider lg:text-4xl">
          Quizzical
        </h1>
        <p className="text-primary text-[16px] lg:text-lg">
          Are you ready for questions?
        </p>
      </div>
      <button className="main-btn px-8 py-4 lg:px-10">Start Quizz</button>
      <Bulb backgroundColor="#FFFAD1" top="-30%" right="-30%" />
      <Bulb backgroundColor="#DEEBF8" bottom="-30%" left="-30%" />
    </main>
  );
}
