import "animate.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Router, RouterProvider } from "@tanstack/react-router";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "@/libs/react-query";
import { routeTree } from "@/routeTree.gen";

import { useAuth } from "./contexts/auth/useAuth";

const router = new Router({
  routeTree,
  context: {
    queryClient,
    userSession: null,
    auth: undefined!,
  },
  defaultPreload: "intent",
  defaultStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const auth = useAuth();
  const basePath = import.meta.env.PROD
    ? "/student/student65/u65301280011/IKEA-DeskShop/"
    : undefined;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GoogleReCaptchaProvider reCaptchaKey="6LeUHfwjAAAAAOi3d2SbJhKXxFJ4EZAdHnRDb81t">
          <ThemeProvider defaultTheme="system" storageKey="ui-theme">
            <TooltipProvider delayDuration={400}>
              <RouterProvider
                router={router}
                context={{ queryClient, auth }}
                basepath={basePath}
              />

              <ReactQueryDevtools initialIsOpen={false} />
            </TooltipProvider>
          </ThemeProvider>
        </GoogleReCaptchaProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
