import { Link, useNavigate } from "@tanstack/react-router";
import { useAtom } from "jotai";
import logLevel from "loglevel";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { userSessionAtom } from "@/libs/jotai";

import { Theme, useTheme } from "./theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const UserMenu: FC = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [userSession, setUserSession] = useAtom(userSessionAtom);
  const navigate = useNavigate();

  const handleClickSignOutButton = useCallback(() => {
    const isConfirmSignOut = confirm("ต้องการออกจากระบบหรือไม่?");
    if (!isConfirmSignOut) return;

    logLevel.debug("sign out");

    setUserSession(null);

    toast(t("signOutSuccess"));

    // navigate("/auth/login");
    navigate({ to: "/auth/login" });
  }, [navigate, setUserSession, t]);

  if (!userSession) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* <Button variant="outline">Open</Button> */}
          <Avatar className="cursor-pointer">
            <AvatarImage
              src="https://github.com/shadcn.png"
              // className="h-4 w-auto"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{`สวัสดี ${userSession.name}`}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to="/user/order">{t("order", "Order")}</Link>
            </DropdownMenuItem>

            {/* <DropdownMenuItem>{t("billing", "Billing")}</DropdownMenuItem> */}
            {/* <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem> */}
            {/* <DropdownMenuItem>
              Keyboard shortcuts
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem> */}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {/* <DropdownMenuItem>Team</DropdownMenuItem> */}

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                {t("appTheme", "App theme")}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={(v) => setTheme(v as Theme)}
                  >
                    <DropdownMenuRadioItem value="system">
                      {t("appThemeSystem", "System")}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                      {t("appThemeDark", "Dark")}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="light">
                      {t("appThemeLight", "Light")}
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                {t("language", "Language")}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    // value={theme}
                    // onValueChange={(v) => setTheme(v as Theme)}
                    defaultValue="th"
                    value="th"
                  >
                    {/* <DropdownMenuRadioItem value="en">
                      {"English"}
                    </DropdownMenuRadioItem> */}
                    <DropdownMenuRadioItem value="th" disabled>
                      {"ภาษาไทย"}
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>API</DropdownMenuItem>
          {/* <DropdownMenuItem asChild>
            <Link to="/setting/profile">{t("setting", "Setting")}</Link>
          </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleClickSignOutButton}>
            {t("signOut", "Sign out")}
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserMenu;
