import { useNProgress } from "@tanem/react-nprogress";
import { useAtom } from "jotai";
import { FC } from "react";

import { isNProgressIsAnimatingAtom } from "@/libs/jotai";

import NProgressBar from "./bar";
import NProgressContainer from "./container";

const NProgress: FC = () => {
  const [isAnimating] = useAtom(isNProgressIsAnimatingAtom);

  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
    animationDuration: 300,
    incrementDuration: 500,
  });

  return (
    <NProgressContainer
      animationDuration={animationDuration}
      isFinished={isFinished}
    >
      <NProgressBar animationDuration={animationDuration} progress={progress} />
      {/*
      This example doesn't use a spinner component so the UI stays
      tidy. You're free to render whatever is appropriate for your
      use-case.
      */}
    </NProgressContainer>
  );
};

export default NProgress;
