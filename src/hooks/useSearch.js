import { useEffect, useState } from 'react';

/**
 * Hook para buscar personajes en la Rick and Morty API.
 *
 * @param {string} query - Texto ingresado por el usuario.
 * @returns {{ results: Array, loading: boolean, error: string|null }}
 *
 * - results  : Array de personajes (solo los campos necesarios)
 * - loading  : true mientras la petición está en vuelo
 * - error    : mensaje legible en caso de error de red u otro error HTTP
 */
export function useSearch(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const trimmed = query.trim();

  useEffect(() => {
    // Si el query está vacío, no hay nada que buscar
    if (trimmed === '') return;

    const controller = new AbortController();

    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);

      const base = import.meta.env.VITE_API_BASE_URL;
      const url = `${base}/character/?name=${encodeURIComponent(trimmed)}`;

      try {
        const response = await fetch(url, { signal: controller.signal });

        // 404 → sin resultados, no es error
        if (response.status === 404) {
          setResults([]);
          return;
        }

        if (!response.ok) {
          // Otros códigos de error (5xx, 4xx distinto de 404)
          setError('Ocurrió un error. Intentá de nuevo.');
          return;
        }

        const data = await response.json();
        // Transformar los resultados manteniendo solo los campos necesarios
        const items = (data.results || []).map(p => ({
          id: p.id,
          name: p.name,
          status: p.status,
          species: p.species,
          origin: p.origin?.name ?? '',
          image: p.image,
        }));

        setResults(items);
      } catch (e) {
        // Distinción entre abort y error real
        if (e.name !== 'AbortError') {
          setError('No se pudo conectar. Revisá tu conexión.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();

    // Cleanup: abortar petición si query cambia antes de que termine
    return () => controller.abort();
  }, [trimmed]);

  // Cuando el query está vacío, devolver estado limpio sin pasar por el effect
  if (trimmed === '') {
    return { results: [], loading: false, error: null };
  }

  return { results, loading, error };
}
