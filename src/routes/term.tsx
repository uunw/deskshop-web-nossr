import { FileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = new FileRoute('/term').createRoute({
  component: TermComponent,
});

function TermComponent() {
  return (
    <motion.div>
      <p>term</p>
    </motion.div>
  );
}
