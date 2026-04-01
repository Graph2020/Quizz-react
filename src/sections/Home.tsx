import Bulb from "../components/Bulb";
import { useContext, useRef } from "react";
import { AppContext } from "../App";
import type { JSX } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);
export default function Home(): JSX.Element {
  const { showQuestions, setShowQuestions } = useContext(AppContext);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const titleSplit = SplitText.create("h1", { type: "chars" });
      const tl = gsap.timeline();

      tl.from(titleSplit.chars, {
        y: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
      })
        .from(
          "p",
          {
            x: 50,
            opacity: 0,
          },
          "<0.5",
        )
        .from(
          "button",
          {
            scale: 0,
            duration: 0.5,
            ease: "back.out(1.7, 0.3)", // back.out makes it pop out and settle! bounce.in hides it for too long.
          },
          "<0.5",
        );
    },
    { scope: containerRef },
  );
  return (
    <>
      <div ref={containerRef} className="text-center">
        <h1 className="text-primary text-3xl font-bold tracking-wider lg:text-4xl">
          Quizzical
        </h1>
        <p className="text-primary mb-7 text-[16px] lg:text-lg">
          Are you ready for questions?
        </p>
        <button
          className="main-btn cursor-pointer px-8 py-4 lg:px-10"
          onClick={() => setShowQuestions(true)}
        >
          Start Quizz
        </button>
      </div>
    </>
  );
}
