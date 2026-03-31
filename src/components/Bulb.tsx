import type { JSX } from "react";
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
  return (
    <div
      className="absolute size-80 rounded-full md:size-96 lg:size-110"
      style={{
        backgroundColor: backgroundColor,
        top: top,
        bottom: bottom,
        left: left,
        right: right,
      }}
    >
      Bulb
    </div>
  );
}
