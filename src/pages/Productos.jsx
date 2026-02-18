import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { use } from 'react';

const Productos = () => {
  const productos = useState([]);

    const cargar = async ()=>{
        const api= await api.get('/productos');
        productos[1](api.data);
    }
    useEffect(() => {
        cargar();
    },[]);


  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800">INVENTARIO</h1>
      <p className="mt-4 text-slate-600">Productos cargados en el sistema.</p>
        
    </div>
  );
};

export default Productos;
