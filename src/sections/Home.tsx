import Bulb from "../components/Bulb";
import { useContext } from "react";
import { AppContext } from "../App";
export default function Home() {
  const { showQuestions, setShowQuestions } = useContext(AppContext);
  console.log(showQuestions);
  return (
    <>
      <div className="text-center">
        <h1 className="text-primary text-3xl font-bold tracking-wider lg:text-4xl">
          Quizzical
        </h1>
        <p className="text-primary text-[16px] lg:text-lg">
          Are you ready for questions?
        </p>
      </div>
      <button
        className="main-btn cursor-pointer px-8 py-4 transition-transform hover:scale-105 lg:px-10"
        onClick={() => setShowQuestions(true)}
      >
        Start Quizz
      </button>
    </>
  );
}
