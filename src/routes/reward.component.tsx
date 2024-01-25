import { motion } from "framer-motion";

const stickers = [
  {
    label: "คิดสิคิด",
    imageHref: "1",
  },
  {
    label: "งงไปหมดแล้ว",
    imageHref: "2",
  },
  {
    label: "ชอบมากนะ",
    imageHref: "3",
  },
  {
    label: "เยี่ยมเลยคับพี่",
    imageHref: "4",
  },
  {
    label: "สุดยอดค้าบ",
    imageHref: "5",
  },
  {
    label: "หะอะไรนะ",
    imageHref: "6",
  },
  {
    label: "อะให้สิบบาท",
    imageHref: "7",
  },
  {
    label: "อืมเจ๋งดี",
    imageHref: "8",
  },
];

// export const Route = new FileRoute('/reward').createRoute({
//   component: RewardComponent,
// });

export const component = function RewardComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container mx-auto px-0 md:px-2 lg:px-56 mt-10">
        <div className="flex gap-2">
          <p>{"ออกแบบชิ้นงานสติกเกอร์ภาพนิ่ง"}</p>
          <p className="text-red-500">{"[สร้างอาชีพได้ด้วย Line Studio]"}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
          {stickers.map((s, i) => (
            <div
              key={i}
              className={`bg-slate-50 px-5 pb-6 items-center justify-center justify-items-center text-center rounded-lg shadow-md center animate__animated animate__zoomIn`}
            >
              <img
                src={
                  import.meta.env.BASE_URL +
                  `img1/nonthaphan/${s.imageHref}.png`
                }
                draggable={false}
                // className="h-28 w-auto"
              />
              <p className="font-bold">{`${i + 1}. ${s.label}`}</p>
              <p className="text-slate-500">{"นนทพันธ์ อินทวงศ์"}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-20">
          <p>{"งานแต่งภาพสติกเกอร์ภาพเคลื่อนไหว"}</p>
          <p className="text-red-500">{"[สร้างอาชีพได้ด้วย Line Studio]"}</p>
        </div>

        <div className="grid grid-cols-4 gap-8 mt-10">
          {stickers.map((s, i) => (
            <div
              key={i}
              className="bg-slate-50 px-5 pb-6 items-center justify-center text-center rounded-lg shadow-md center animate__animated animate__zoomIn"
            >
              <img
                src={
                  import.meta.env.BASE_URL +
                  `imganimat/nonthaphan/${s.imageHref}.gif`
                }
                draggable={false}
                // className="h-28 w-auto"
              />
              <p className="font-bold">{`${i + 1}. ${s.label}`}</p>
              <p className="text-slate-500">{"นนทพันธ์ อินทวงศ์"}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
