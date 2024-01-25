import { useAtom } from "jotai";
import { FC } from "react";
import { Outlet } from "@tanstack/react-router";

import { userSessionAtom } from "@/libs/jotai";

const ManageLayout: FC = () => {
  const [userSession] = useAtom(userSessionAtom);

  if (!userSession) return null;
  // if (!userSession) return <Navigate to="/auth/login" />;

  if (userSession.status !== "EMPLOYEE") {
    return (
      <>
        <p>หน้าสำหรับผู้ดูแลระบบเท่านั้น</p>
      </>
    );
  }

  return (
    <>
      {/* <p>manage layout</p> */}

      <Outlet />
    </>
  );
};

export default ManageLayout;
