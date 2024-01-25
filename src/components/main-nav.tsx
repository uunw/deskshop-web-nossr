import { Link } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";

import { userSessionAtom } from "@/libs/jotai";

import NavItem from "./nav-item";

export function MainNav() {
  const { t } = useTranslation();
  const [userSession] = useAtom(userSessionAtom);

  return (
    <div className="mr-4 hidden md:flex">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <img
          src={import.meta.env.BASE_URL + "IDS.png"}
          alt="logo"
          className="h-8 w-auto rounded"
        />
        <span className="hidden font-bold sm:inline-block">
          {"IKEA-DeskShop"}
        </span>
      </Link>

      <nav className="flex items-center space-x-6 text-sm font-medium">
        <NavItem href="/reward" label={t("reward", "Reward")} />
        <NavItem href="/document" label={t("document")} />
        <NavItem href="/product" label={t("product")} />
        
        {userSession
          ? userSession.status === "EMPLOYEE" && (
              <NavItem href="/manage" label={t("manage", "Manage")} />
            )
          : null}
      </nav>
    </div>
  );
}
