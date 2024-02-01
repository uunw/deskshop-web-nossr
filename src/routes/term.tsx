import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute('/term')({
  component: TermComponent,
});

function TermComponent() {
  return (
    <motion.div>
      <p>term</p>
    </motion.div>
  );
}
