import { api } from '../services/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const entrar = async () => {
        setLoading(true);
        setError('');

        try {
            const data = await api.post('/auth/login', {email,password});
            localStorage.setItem('token', data.token);
            navigate('/dashboard');

        } catch (err) {
            setError("Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

     if (loading) return (
        <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-blue-600" size={48} />
        </div>
    );

  return (
     <div className="login-container">
        <h2 className="login-title">INICIO DE SESIÓN</h2>

        <input type = "email" placeholder="Correo" className="login-input" value={email} onChange={(e)=> setEmail(e.target.value)} />
        <input type = "password" placeholder="Contraseña" className="login-input" value={password} onChange={(e)=> setPassword(e.target.value)} />
    
        <button className="login-button" onClick={entrar}>Entrar</button>
     </div>
  );
};

export default Login;