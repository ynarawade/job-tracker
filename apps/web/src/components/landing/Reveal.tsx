import clsx from "clsx";
import * as motion from "motion/react-client";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 24,
}: RevealProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: distance,
        filter: "blur(8px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={clsx(className)}
    >
      {children}
    </motion.div>
  );
}
