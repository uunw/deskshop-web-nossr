import "./globals.css";
import "@/libs/i18n";
import "dayjs/locale/th";

import dayjs from "dayjs";
import buddhistEraPlugin from "dayjs/plugin/buddhistEra";
import utcPlugin from "dayjs/plugin/utc";
import logLevel from "loglevel";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }

logLevel.setDefaultLevel(import.meta.env.DEV ? "trace" : "info");

const rootElement = document.getElementById("root") as HTMLElement;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);

  dayjs.extend(buddhistEraPlugin);
  dayjs.extend(utcPlugin);
  dayjs.locale("th");

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
