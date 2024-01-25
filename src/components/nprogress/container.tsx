import { FC, ReactNode } from "react";

type Prop = {
  animationDuration: number;
  isFinished: boolean;
  children: ReactNode;
};

const NProgressContainer: FC<Prop> = ({
  animationDuration,
  children,
  isFinished,
}) => (
  <div
    style={{
      opacity: isFinished ? 0 : 1,
      pointerEvents: "none",
      transition: `opacity ${animationDuration}ms linear`,
    }}
  >
    {children}
  </div>
);

export default NProgressContainer;
