import type { JSX } from "react";
import { useContext, useRef } from "react";
import { AppContext } from "../App";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
type BulbProps = {
  backgroundColor: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

export default function Bulb({
  backgroundColor,
  top,
  bottom,
  left,
  right,
}: BulbProps): JSX.Element {
  const { showQuestions } = useContext(AppContext);
  const bulbRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(bulbRef.current, {
      scale: 0,
      duration: 2,
      delay: 1,
      ease: "bounce.inOut",
    });
  });

  return (
    <div
      ref={bulbRef}
      className="absolute size-80 rounded-full md:size-96 lg:size-110 xl:size-160"
      style={{
        backgroundColor: backgroundColor,
        top: top,
        bottom: bottom,
        left: left,
        right: right,
      }}
    ></div>
  );
}
