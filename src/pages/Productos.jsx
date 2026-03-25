import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { ShoppingBag, Loader, AlertCircle, Plus, X, MessageCircle, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const data = await api.get('/productos/mostrar'); 
      setProductos(data);
    } catch (err) {
      setError("No se pudo conectar con el servidor. ¿Está encendido?");
    } finally {
      setLoading(false);
    }
  };

  const crearProducto= async ()=>{
    console.log('Boton presionado');
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;
    const id_categoria = document.getElementById('id_categoria').value;
    const descripcion = document.getElementById('descripcion').value;
    const imagen_url = document.getElementById('imagen_url').value;
    const youtube_id = document.getElementById('youtube_id').value;
    const latitud = document.getElementById('latitud').value;
    const longitud= document.getElementById('longitud').value;
    console.log(nombre, precio, stock, id_categoria, descripcion, imagen_url, youtube_id, latitud, longitud);
    console.log('datos cargados en el objeto');
    try{
      console.log('Intentando crear producto');
     const nuevo = await api.post('/productos/crear', {nombre: nombre, precio: precio, stock: stock, id_categoria: id_categoria, descripcion: descripcion, imagen_url: imagen_url || null, youtube_id: youtube_id || null, latitud: latitud || null, longitud:longitud || null});
     
     console.log(nuevo);
    }catch(err){
      console.log(err);
      setError("Error al crear producto");
     // navigate('/productos');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <Loader className="animate-spin text-blue-600" size={48} />
    </div>
  );

  if (error) return (
    <div className="bg-red-100 text-red-700 p-4 rounded-lg flex items-center gap-2">
      <AlertCircle /> {error}
    </div>
  );

  const compartirWhatsapp = (producto) =>{
    const mensaje = `¡producto de la tienda!\n\n ${producto.nombre}\n $${producto.precio}\n\n ¿te interesa?`;
    const textoCodificado= encodeURIComponent(mensaje);
    window.open(`https://api.whatsapp.com/send?text=${textoCodificado}`, '_blank');
  };

  const compartirTwitter = (producto)=>{
    const mensaje = `¡producto de la tienda!\n\n ${producto.nombre} por solo $${producto.precio}\n\n Vamos a verlooo #InventarioPro`;
    const textoCodificado = encodeURIComponent(mensaje);
    window.open(`https://twitter.com/intent/tweet?text=${textoCodificado}`, '_blank');
  };

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          <ShoppingBag className="text-blue-600" /> Inventario
        </h1>
        
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
          {productos.length} items
        </span>
      </header>

      
      <input type="text" placeholder="nombre del producto" className="border border-slate-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500" id="nombre" />
      <input type="text" placeholder="precio" className="border border-slate-300 rounded-lg px-4 py-2 w-1/6 focus:outline-none focus:ring-2 focus:ring-blue-500" id="precio" />
      <input type="text" placeholder="stock" className="border border-slate-300 rounded-lg px-4 py-2 w-1/6 focus:outline-none focus:ring-2 focus:ring-blue-500" id="stock" />
      <input type="text" placeholder="id categoria" className="border border-slate-300 rounded-lg px-4 py-2 w-1/6 focus:outline-none focus:ring-2 focus:ring-blue-500" id="id_categoria" />
      <input type="text" placeholder="descripcion" className="border border-slate-300 rounded-lg px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500" id="descripcion" />
      <input type="text" placeholder="url imagen" className="border border-slate-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500" id="imagen_url" />
      <input type="text" placeholder="youtube id" className="border border-slate-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500" id="youtube_id" />
       <input type="text" placeholder="latitud" className="border border-slate-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500" id="latitud" />
      <input type="text" placeholder="longitud" className="border border-slate-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500" id="longitud" />
      <button onClick={crearProducto} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
        Crear Producto
      </button>


      {/* Grid Responsivo: 1 col móvil, 2 tablet, 3 desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {productos.map((prod) => (
          <div key={prod.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 overflow-hidden flex flex-col">
            
            {/* Imagen del producto o video */}
            <div className="h-48 p-4 bg-white flex items-center justify-center border-b border-slate-50">

              {prod.youtube_id ? (
                <iframe width="100%" height= "100%" src={`https://www.youtube.com/embed/${prod.youtube_id}`} title="Youtube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              ) : (
                <img src={prod.imagen_url || "https://via.placeholder.com/150"} alt={prod.nombre} className="max-h-full object-contain"/>
              )}
            </div>

            {/* Cuerpo de la tarjeta */}
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-slate-800 line-clamp-1" title={prod.nombre}>
                  {prod.nombre}
                </h3>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">
                  ${prod.precio}
                </span>
              </div>
              
              <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">
                {prod.descripcion || "Sin descripción disponible."}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                <span className="text-xs font-medium text-slate-400">
                  Stock: <span className={prod.stock < 10 ? "text-red-500 font-bold" : "text-slate-600"}>{prod.stock}</span>
                </span>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Editar
                </button>
              </div>
            </div>

            {/*Sección del mapa*/}
            <div className= "h-48 w-full border-t border-slate-100  z-0 relative">
              <MapContainer
                center={[prod.latitud || 20.997601, prod.longitud || -100.381532]}
                zoom={13}
                style={{height: "100%", width: "100%", zIndex:0}}
              >
                {/*Este es el servidor de OpenStreetMap que nos regala los mapas gratis*/}
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution= '&copy; OpenStreetMap'
                />
              <Marker position={[prod.latitud || 20.997601, prod.longitud || -100.381532]}>
                <Popup>
                  Ubicación de: <br /> ¿ <strong>{prod.nombre}</strong>
                </Popup>
              </Marker>
              </MapContainer>
            </div>

              {/* NUEVO: Barra de Redes Sociales */}
            <div className="pt-3 flex justify-between items-center bg-slate-50 -mx-4 -mb-4 px-4 py-3 rounded-b-xl border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <Share2 size={14} /> Compartir:
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => compartirWhatsapp(prod)}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition shadow-sm"
                  title="Compartir en WhatsApp"
                >
                  <MessageCircle size={16} />
                </button>
                <button
                  onClick={() => compartirTwitter(prod)}
                  className="bg-black hover:bg-slate-800 text-white p-2 rounded-full transition shadow-sm"
                  title="Compartir en X (Twitter)"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
