import { Link } from "@tanstack/react-router";

type Navigation = {
  name: string;
  href: string;
  target?: `_blank`;
};

const navigation: Navigation[] = [
  // { name: `โปรโมชั่นพิเศษ`, href: `/product` },
  { name: `สินค้าทั้งหมด`, href: `/product` },
  { name: `เกี่ยวกับ`, href: `/about` },
  {
    name: `บทเรียน`,
    href: `/document`,
    // target: `_blank`,
  },
  {
    name: `ใบความรู้`,
    href: `https://waraporn.cmtc.ac.th/student/student65/u65301280011/IKEA-DeskShop/workshop/`,
    target: `_blank`,
  },
  {
    name: "ผลงาน",
    href: "/reward",
  },
  {
    name: "เข้าสู่ระบบ",
    href: "/login",
  },
  {
    name: "สมัครสมาชิก",
    href: "/register",
  },
];

const Navbar = () => {
  return (
    <div className="px-6 py-3 lg:px-8 fixed min-w-full z-50 bg-neutral-200/25 backdrop-blur-sm">
      <nav
        className="flex h-16 items-center justify-between"
        aria-label="Global"
      >
        <div className="flex lg:min-w-0" aria-label="Global">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{"IKEA-DeskShop"}</span>
            <img
              className="h-16 rounded-xl shadow-sm transition duration-150 ease-in-out hover:shadow-md"
              src={import.meta.env.BASE_URL + "IDS.png"}
              alt="ids"
            />
          </Link>
        </div>

        <div className="hidden md:flex lg:min-w-0 md:justify-center md:gap-x-8 whitespace-nowrap">
          {navigation.map((item, i) => (
            <Link
              key={i}
              to={item.href}
              target={item.target}
              className="font-semibold text-gray-900 hover:text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
