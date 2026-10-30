"use client";

// Magic UI Blur Fade (https://magicui.design/docs/components/blur-fade)
import {
  AnimatePresence,
  motion,
  type MotionProps,
  type Variants,
} from "motion/react";

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  blur?: string;
}

/** 흐리고 투명한 상태에서 선명하게 나타나는 진입 효과 */
export function BlurFade({
  children,
  className,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = "down",
  blur = "6px",
  ...props
}: BlurFadeProps) {
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const from = direction === "right" || direction === "down" ? -offset : offset;
  const variants: Variants = {
    hidden: { [axis]: from, opacity: 0, filter: `blur(${blur})` },
    visible: { [axis]: 0, opacity: 1, filter: "blur(0px)" },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: "easeOut",
          filter: { duration },
        }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
