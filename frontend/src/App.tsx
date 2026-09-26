import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <FundoGatinhos />
      <ScrollToTop />
      <Routes>
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
    </BrowserRouter>
  );
}

export default App;
