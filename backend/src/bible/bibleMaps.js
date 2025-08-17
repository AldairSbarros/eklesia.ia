// Serviço para buscar mapas e dados bíblicos públicos
import axios from 'axios';

// Busca coordenadas e dados de um local bíblico via OpenBible.info
export async function buscarMapaBiblico(local) {
  // OpenBible.info retorna CSV, mas podemos usar o endpoint JSON experimental
  const url = `https://www.openbible.info/geo/places.json?q=${encodeURIComponent(local)}`;
  const { data } = await axios.get(url);
  if (!data || !data.places || data.places.length === 0) {
    return null;
  }
  const place = data.places[0];
  return {
    nome: place.name,
    latitude: place.lat,
    longitude: place.lon,
    mapa: `https://www.openbible.info/geo/?loc=${encodeURIComponent(place.name)}`,
    descricao: place.description || '',
    imagens: [
      // Wikimedia Commons busca por nome do local
      `https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(local)}&title=Special:MediaSearch&go=Go&type=image`
    ]
  };
}
