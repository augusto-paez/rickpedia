import { useFavorites } from '../context/FavoritesContext';

export default function Navbar({ onOpenPanel }) {
  const { favorites } = useFavorites();
  const total = favorites.length;

  return (
    <header className="border-b border-gray-800 bg-[#141420]/90 backdrop-blur-md sticky top-0 z-20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Título / Marca */}
        <div className="flex items-center gap-3">
          <span className="text-2xl">🧪</span>
          <h1 className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-cyan-accent)] to-[var(--color-violet-accent)]">
            Rickpedia
          </h1>
        </div>

        {/* Botón para abrir el panel de favoritos */}
        <nav>
          <button
            type="button"
            onClick={onOpenPanel}
            aria-label={`Ver favoritos (${total} personajes)`}
            className="flex items-center gap-2 bg-[#1f202e] hover:bg-[#282a3d] border border-gray-700 text-white font-medium px-4 py-2 rounded-xl transition-all cursor-pointer"
          >
            <span>⭐ Favoritos</span>

            {/* Contador reactivo */}
            {total > 0 && (
              <span className="bg-[var(--color-violet-accent)] text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                {total}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}