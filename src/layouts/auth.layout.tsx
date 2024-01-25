import { Outlet } from "@tanstack/react-router";
import { FC, Suspense } from "react";

const AuthLayout: FC = () => {
  return (
    <>
      <p>auth</p>

      <Suspense fallback={<p>loading page...</p>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default AuthLayout;
