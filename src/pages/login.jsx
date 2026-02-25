import { api } from '../services/api';

const login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const entrar = async () => {
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
     <div>
        <h2 className="login-title">INICIO DE SESIÓN</h2>
        <input type="text" placeholder ="Usuario" className= "login-input"/>
        <input type="password" placeholder ="Contraseña" className= "login-input"/>
        <button className="login-button" onClick={entrar}>Entrar</button>
     </div>
  );
};

export default login;