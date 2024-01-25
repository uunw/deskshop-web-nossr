// import Link from "next/link"
import { Link } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { TbShoppingCart } from "react-icons/tb";

// import { CommandMenu } from "@/components/command-menu";
// import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { userSessionAtom } from "@/libs/jotai";

// import { siteConfig } from "@/config/site"
import { MainNav } from "./main-nav";
import SearchMenu from "./search-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import UserMenu from "./user-menu";

export function SiteHeader() {
  const { t } = useTranslation();
  // const { isSignedIn, isLoaded } = useUser();
  const [userSession] = useAtom(userSessionAtom);
  // const [localCart] = useAtom(localCartAtom);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MainNav />
        {/* <MobileNav /> */}

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <SearchMenu />
          </div>

          <nav className="flex items-center space-x-3">
            {userSession ? (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" asChild>
                      <Link to="/cart">
                        <TbShoppingCart className="h-4 w-auto" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cart</p>
                  </TooltipContent>
                </Tooltip>

                <UserMenu />
              </>
            ) : (
              <>
                <Button type="button" variant="link" asChild>
                  <Link to="/auth/login">{t("signin", "Sign In")}</Link>
                </Button>
                <Button type="button" asChild>
                  <Link to="/auth/register">{t("signup", "Sign Up")}</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
