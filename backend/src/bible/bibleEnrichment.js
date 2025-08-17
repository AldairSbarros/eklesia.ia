// Serviços para enriquecer a Eklesia API com dados públicos bíblicos
import axios from 'axios';

// 1. Mapas e coordenadas bíblicas (OpenBible.info)
export async function buscarMapaBiblico(local) {
  const url = `https://www.openbible.info/geo/places.json?q=${encodeURIComponent(local)}`;
  const { data } = await axios.get(url);
  if (!data || !data.places || data.places.length === 0) return null;
  const place = data.places[0];
  return {
    nome: place.name,
    latitude: place.lat,
    longitude: place.lon,
    mapa: `https://www.openbible.info/geo/?loc=${encodeURIComponent(place.name)}`,
    descricao: place.description || '',
    imagens: [
      `https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(local)}&title=Special:MediaSearch&go=Go&type=image`
    ]
  };
}

// 2. Imagens e artefatos (Wikimedia Commons, BibleAtlas, British Museum)
export async function buscarImagensBiblicas(termo) {
  // Wikimedia Commons API
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&prop=imageinfo&generator=search&gsrsearch=${encodeURIComponent(termo)}&gsrlimit=5&iiprop=url`;
  const { data } = await axios.get(url);
  const imagens = [];
  if (data.query && data.query.pages) {
    for (const pageId in data.query.pages) {
      const img = data.query.pages[pageId].imageinfo?.[0]?.url;
      if (img) imagens.push(img);
    }
  }
  // BibleAtlas e British Museum: links diretos
  return {
    imagens,
    bibleAtlas: `http://bibleatlas.org/full/${encodeURIComponent(termo)}.htm`,
    britishMuseum: `https://www.britishmuseum.org/collection/search?keyword=${encodeURIComponent(termo)}`
  };
}

// 3. Dados históricos/culturais (reis, reinos, medidas, pesos, costumes) via Wikidata/Wikipedia
export async function buscarDadosWikidata(termo) {
  // Wikidata API: busca entidades relacionadas
  const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(termo)}&language=pt&format=json&origin=*`;
  const { data } = await axios.get(url);
  if (!data.search || data.search.length === 0) return null;
  const entidade = data.search[0];
  // Wikipedia resumo
  const wikiUrl = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(entidade.label)}`;
  let resumo = '';
  try {
    const wikiRes = await axios.get(wikiUrl);
    resumo = wikiRes.data.extract;
  } catch {}
  return {
    id: entidade.id,
    label: entidade.label,
    descricao: entidade.description,
    resumo,
    wikipedia: `https://pt.wikipedia.org/wiki/${encodeURIComponent(entidade.label)}`
  };
}

// 4. Manuscritos e artefatos (Dead Sea Scrolls)
export function linkDeadSeaScrolls(termo) {
  return `https://www.deadseascrolls.org.il/search?query=${encodeURIComponent(termo)}`;
}
