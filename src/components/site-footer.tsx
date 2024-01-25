// import { siteConfig } from "@/config/site"

import { useAtom } from "jotai";
import { TbDeviceLaptop, TbMoonStars, TbSun } from "react-icons/tb";

import { userSessionAtom } from "@/libs/jotai";

import { Theme, useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function SiteFooter() {
  const { theme, setTheme } = useTheme();
  const [userSession] = useAtom(userSessionAtom);

  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          {"โปรเจคเพื่อการศึกษา โดย "}
          <a
            // href={siteConfig.links.twitter}
            href="http://google.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            {"นนทพันธ์"}
          </a>{" "}
          <a
            // href={siteConfig.links.github}
            href="https://m1r.ai/9/mq0ei.mp4"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            {"Source code"}
          </a>
        </p>

        {!userSession ?? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {theme === "system" ? (
                  <TbDeviceLaptop />
                ) : theme === "dark" ? (
                  <TbMoonStars />
                ) : (
                  <TbSun />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{"App theme"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={theme}
                onValueChange={(v) => setTheme(v as Theme)}
              >
                <DropdownMenuRadioItem value="system">
                  System
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="light">
                  Light
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </footer>
  );
}
