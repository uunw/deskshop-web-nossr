import { FileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = new FileRoute('/manage/').createRoute({
  component: ManageIndexComponent,
});

function ManageIndexComponent() {
  return (
    <motion.div>
      <p>หน้าจัดการสำหรับผู้ดูแลระบบ</p>

      <p>
        <Link to="/manage/product/scheduling_desk">{"- จัดการสินค้า ->"}</Link>
      </p>

      <p>
        <Link to="/manage/product/view_desk">{"- จัดการการจองสินค้า ->"}</Link>
      </p>
    </motion.div>
  );
}
