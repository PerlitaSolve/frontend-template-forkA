const API_URL = "https://backend-api-fork.onrender.com/api" || "http://localhost:4000/api"; // Importante colocar la url de tu api
                //* IMPORT.META.ENV.VITE_API_URL((la variable de entorno se declara en vercel))
export const api = {
  get: async (endpoint) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
      headers:{
        'Authorization': token? `Bearer ${token}`: '',
        'Content-Type':  'application/json'
      },
    });
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error en GET:", error);
      throw error;
    }
  },

  
  post: async (endpoint, body) => {
    const token = localStorage.getItem('token');
    try {
      console.log('Enviando datos al servidor:', body);
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}`: '',
         }, //agrea autorizacion   true? '': ''/  'authorization': token? 'Bearer:' +token: ''
        body: JSON.stringify(body)
      });
      console.log('Respuesta del servidor:', response);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error en POST:", error);
      throw error;
    }
  }
};