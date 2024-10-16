const Prestador = require('../models/prestador');
const { Client } = require("@googlemaps/google-maps-services-js");

// Função que usa a API do Google Maps para calcular distâncias
exports.findNearbyPrestadores = async (req, res) => {
  const { clienteEndereco } = req.body;
  const client = new Client({});
  
  try {
    // Pegando prestadores no banco de dados
    const prestadores = await Prestador.findAll();

    const results = await Promise.all(prestadores.map(async (prestador) => {
      const response = await client.distancematrix({
        params: {
          origins: [clienteEndereco],
          destinations: [prestador.endereco],
          key: 'SUA_API_KEY_GOOGLE_MAPS',
        },
      });
      
      return {
        prestador,
        distance: response.data.rows[0].elements[0].distance.text,
      };
    }));

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar prestadores' });
  }
};
