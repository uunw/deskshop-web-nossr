import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// export const Route = new FileRoute('/document').createRoute({
//   component: DocumentComponent,
// });
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Document = {
  imageUrl: string;
  href: string;
  name: string;
  description: string;
};

const documents: Document[] = [
  {
    imageUrl: `https://waraporn.cmtc.ac.th/student/student65/u65301280011/document-image/1-firstpage.jpg`,
    href: `https://waraporn.cmtc.ac.th/student/student65/u65301280011/document/IKEA-DeskShop.pdf`,
    name: `บทที่ 1`,
    description: `IKEA-DeskShop 1.0`,
  },
  {
    imageUrl: `https://waraporn.cmtc.ac.th/student/student65/u65301280011/document-image/2-firstpage.jpg`,
    href: `https://waraporn.cmtc.ac.th/student/student65/u65301280011/document/IKEA-DeskShop 2.0.pdf`,
    name: `บทที่ 2`,
    description: `IKEA-DeskShop 2.0`,
  },
  {
    imageUrl: `https://waraporn.cmtc.ac.th/student/student65/u65301280011/document-image/3-firstpage.jpg`,
    href: `https://waraporn.cmtc.ac.th/student/student65/u65301280011/document/IKEA-DeskShop 3.0.pdf`,
    name: `บทที่ 3`,
    description: `IKEA-DeskShop 3.0`,
  },
  {
    imageUrl: `https://waraporn.cmtc.ac.th/student/student65/u65301280011/document-image/4-firstpage.jpg`,
    href: `https://waraporn.cmtc.ac.th/student/student65/u65301280011/document/IKEA-DeskShop 4.0-full.pdf`,
    name: `บทที่ 4`,
    description: `IKEA-DeskShop 4.0`,
  },
];

export const component = function DocumentComponent() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("document", "Document")}</CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent>
          {/* <p>Card Content</p> */}
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {documents.map(({ imageUrl, href, name, description }, i) => (
              <div key={i} className="group relative">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={imageUrl}
                    alt={imageUrl}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-current">
                      <Link to={href} target="_blank">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-primary">{description}</p>
                  </div>
                  {/* <p className="text-sm font-medium text-gray-900">
                {product.price}
              </p> */}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        {/* <CardFooter>
    <p>Card Footer</p>
  </CardFooter> */}
      </Card>

      {/* <div className="bg-card">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl">เอกสาร</h1>

          
        </div>
      </div> */}
    </motion.div>
  );
};
