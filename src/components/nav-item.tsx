import { Link, useMatchRoute } from "@tanstack/react-router";
import { FC } from "react";

import { cn } from "@/libs/utils";

type Prop = {
  href: string;
  label: string;
};

const NavItem: FC<Prop> = ({ href, label }) => {
  // const match = useMatch({ from: href });
  const matchRoute = useMatchRoute();
  // const location = useLocation();
  // const pathname = location.pathname;

  return (
    <Link
      to={href}
      className={cn(
        "transition-colors hover:text-foreground/80",
        matchRoute(href) ? "text-foreground" : "text-foreground/60"
      )}
    >
      {label}
    </Link>
  );
};

export default NavItem;
