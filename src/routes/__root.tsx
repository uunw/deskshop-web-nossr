import { QueryClient } from "@tanstack/react-query";
import {
  Outlet,
  rootRouteWithContext,
  ScrollRestoration,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Suspense } from "react";

import NProgress from "@/components/nprogress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";
import { IAuthContext } from "@/contexts/auth";
import { UserSession } from "@/types/session.type";

export const Route = rootRouteWithContext<{
  queryClient: QueryClient;
  userSession: null | UserSession;
  auth: IAuthContext;
}>()({}).update({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <SiteHeader />

      <NProgress />

      {/* <ScrollRestoration /> */}

      <div className="sm:px-10 py-5">
        <Suspense fallback={<p>loading page...</p>}>
          <ScrollRestoration />
          <Outlet />
        </Suspense>
      </div>

      <SiteFooter />
      <Toaster />

      <TanStackRouterDevtools position="bottom-left" initialIsOpen={false} />
    </>
  );
}
