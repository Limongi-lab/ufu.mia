import { motion, useScroll, useSpring } from 'framer-motion';

// Barrinha colorida no topo que acompanha o quanto a página foi rolada
export default function BarraProgresso() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 origin-left z-[60] bg-gradient-to-r from-[#F2C744] via-[#EC4899] to-[#7B1FA2]"
    />
  );
}
