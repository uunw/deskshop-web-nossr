import { FC, ReactNode } from "react";

type Prop = {
  children?: ReactNode;
};
const DebugOutput: FC<Prop> = ({ children }) => {
  if (import.meta.env.PROD || !children) return null;

  return children;
};

export default DebugOutput;
