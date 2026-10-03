import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MotionConfig, motion } from 'framer-motion';
import BarraProgresso from './components/BarraProgresso';
import ScrollToTop from './components/ScrollToTop';
import FundoGatinhos from './components/FundoGatinhos';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Animais from './pages/Animais';
import Doacoes from './pages/Doacoes';
import FAQ from './pages/FAQ';
import ProcessoSeletivo from './pages/ProcessoSeletivo';
import ComoAjudar from './pages/ComoAjudar';
import FaleConosco from './pages/FaleConosco';

function RotasAnimadas() {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/animais" element={<Animais />} />
        <Route path="/doacoes" element={<Doacoes />} />
        <Route path="/como-ajudar" element={<ComoAjudar />} />
        <Route path="/fale-conosco" element={<FaleConosco />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/processo-seletivo" element={<ProcessoSeletivo />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </motion.div>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="never">
      <BrowserRouter>
        <FundoGatinhos />
        <BarraProgresso />
        <ScrollToTop />
        <RotasAnimadas />
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
