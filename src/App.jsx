import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Productos from './pages/Productos';
import login from './pages/login';

const Dashboard = () => (
  <div>
    <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
    <p className="mt-4 text-slate-600">Bienvenido al sistema. Selecciona una opción del menú.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas(sin layout)*/}
          <Route path="/login" element={<login />} /></Routes>
        
      <Routes path="/" element={
        <Layout>
          <Routes>
            {/* rutas privadas (con layout) */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/productos" element={<Productos />} />
          </Routes>
        </Layout>
      }></Routes>
    </BrowserRouter>
  );
}

export default App;