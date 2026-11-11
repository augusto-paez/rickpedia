import { useState } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import CharacterList from './components/CharacterList';
import FavoritesPanel from './components/FavoritesPanel';
import Spinner from './components/Spinner';
import { useSearch } from './hooks/useSearch';
import { useToggle } from './hooks/useToggle';

export default function App() {
  // Estado local para el texto del buscador
  const [query, setQuery] = useState('');

  // Hook que encapsula la petición a la API de Rick & Morty
  const { results, loading, error } = useSearch(query);

  // Hook genérico para controlar la apertura/cierre del panel lateral
  const [isPanelOpen, togglePanel, , closePanel] = useToggle(false);

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] text-[#e8f5e8] font-sans flex flex-col">
      {/* Barra de navegación superior fija */}
      <Navbar onOpenPanel={togglePanel} />

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto w-full px-6 py-8 flex-1">
        {/* Encabezado de búsqueda */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#d8f0d8]">
              Buscador de Personajes
            </h2>
            <p className="text-xs text-[#4a6b4a] mt-0.5">
              Explora dimensiones y guarda a tus personajes favoritos
            </p>
          </div>

          <SearchBar value={query} onChange={setQuery} />
        </div>

        {/* 1. Estado de Carga */}
        {loading && <Spinner />}

        {/* 2. Estado de Error (de red o API) */}
        {!loading && error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center my-8 max-w-lg mx-auto">
            <h3 className="text-lg font-bold text-red-400">Hubo un problema</h3>
            <p className="text-sm text-[#a0b8a0] mt-1">{error}</p>
          </div>
        )}

        {/* 3. Estado Inicial (cuando el usuario todavía no buscó nada) */}
        {!loading && !error && query.trim() === '' && (
          <div className="bg-[var(--color-bg-card)] border border-dashed border-[var(--color-portal-dim)]/30 rounded-2xl p-12 text-center my-8 max-w-lg mx-auto">
            <h3 className="text-lg font-bold text-[#d8f0d8]">
              Comenzá tu búsqueda
            </h3>
            <p className="text-sm text-[#4a6b4a] mt-1">
              Escribí un nombre en el buscador superior para encontrar personajes de la serie.
            </p>
          </div>
        )}

        {/* 4. Lista de Resultados o Estado Vacío (si buscó y no hubo coincidencias) */}
        {!loading && !error && query.trim() !== '' && (
          <CharacterList items={results} onClear={() => setQuery('')} />
        )}
      </main>

      {/* Panel lateral de favoritos */}
      <FavoritesPanel isOpen={isPanelOpen} onClose={closePanel} />
    </div>
  );
}
