import { createFileRoute, Outlet } from "@tanstack/react-router";
import { TbRocket } from "react-icons/tb";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const Route = createFileRoute("/manage")({
  component: ManageRootComponent,
});

function ManageRootComponent() {
  return (
    <>
    <div className="space-y-5">

      <Alert>
        <TbRocket className="h-4 w-4" />
        <AlertTitle>{"Employee Page"}</AlertTitle>
        <AlertDescription>
          {'หน้าสำหรับผู้ดูแลระบบ'}
        </AlertDescription>
      </Alert>

      <Outlet />
    </div>
    </>
  );
}
