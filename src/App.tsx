import React, { useState, createContext } from "react";
import type { JSX } from "react";
import Bulb from "./components/Bulb";
import Home from "./sections/Home";
import Quizz from "./sections/Quizz";
export const AppContext = createContext<{
  showQuestions: boolean;
  setShowQuestions: React.Dispatch<React.SetStateAction<boolean>>;
}>(undefined!);
export default function App(): JSX.Element {
  const [showQuestions, setShowQuestions] = useState<boolean>(false);
  return (
    <AppContext.Provider value={{ showQuestions, setShowQuestions }}>
      <main className="bg-background relative flex min-h-screen w-full flex-col items-center justify-center gap-5 overflow-hidden">
        {!showQuestions ? <Home /> : <Quizz />}
        <Bulb backgroundColor="#FFFAD1" top="-30%" right="-30%" />
        <Bulb backgroundColor="#DEEBF8" bottom="-30%" left="-30%" />
      </main>
    </AppContext.Provider>
  );
}
