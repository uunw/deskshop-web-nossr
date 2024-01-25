import "animate.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Router, RouterProvider } from "@tanstack/react-router";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "@/libs/react-query";
import { routeTree } from "@/routeTree.gen";

const router = new Router({
  routeTree,
  context: {
    queryClient,
    userSession: null
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
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GoogleReCaptchaProvider reCaptchaKey="6LeUHfwjAAAAAOi3d2SbJhKXxFJ4EZAdHnRDb81t">
          <ThemeProvider defaultTheme="system" storageKey="ui-theme">
            <TooltipProvider delayDuration={400}>
              <RouterProvider router={router} context={{}} />
              
              <ReactQueryDevtools initialIsOpen={false} />
            </TooltipProvider>
          </ThemeProvider>
        </GoogleReCaptchaProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
