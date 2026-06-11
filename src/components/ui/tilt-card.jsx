import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";

const ROTATION_RANGE = 32.5;

const TiltCard = ({ children }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`
  rotateX(${xSpring}deg) 
  rotateY(${ySpring}deg)
  `;

  const handleMouseMove = (e) => {
  if (!ref.current) return;

  const rect = ref.current.getBoundingClientRect();

  const width = rect.width;
  const height = rect.height;

  // Position des Mauszeigers innerhalb der Karte (0 bis 1)
  const mouseX = (e.clientX - rect.left) / width;
  const mouseY = (e.clientY - rect.top) / height;

  // -16.25° bis +16.25°
  const rY = (mouseX - 0.5) * ROTATION_RANGE;
  const rX = -(mouseY - 0.5) * ROTATION_RANGE;

  x.set(rX);
  y.set(rY);
};

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
    >
       {children}
    </motion.div>
  );
};

export default TiltCard;