// import { useUser } from "@clerk/clerk-react";
import { useAtom } from "jotai";
import { FC, Suspense, useEffect } from "react";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";

import NProgress from "@/components/nprogress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { isNProgressIsAnimatingAtom } from "@/libs/jotai";

const DefaultLayout: FC = () => {
  // const [sessionLoadable] = useAtom(sessionLoadableAtom);
  // const { isLoaded, isSignedIn } = useUser();
  const [, setIsNProgressIsAnimating] = useAtom(isNProgressIsAnimatingAtom);

  useEffect(() => {
    // if (!isLoaded) return;
    // if (!isSignedIn) return;

    // if (isSignedIn) {
    setIsNProgressIsAnimating(false);
    // }
  });

  return (
    <>
      {/* <Navbar /> */}
      <SiteHeader />

      <NProgress />

      <ScrollRestoration />

      <div className="sm:px-10 py-12">
        <Suspense fallback={<p>loading page...</p>}>
          <Outlet />
        </Suspense>
      </div>

      <SiteFooter />
    </>
  );
};

export default DefaultLayout;
