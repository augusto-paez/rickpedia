import { useFavorites } from '../context/FavoritesContext';

export default function Navbar({ onOpenPanel }) {
  const { favorites } = useFavorites();
  const total = favorites.length;

  return (
    <header className="border-b border-[var(--color-portal-dim)]/40 bg-[var(--color-bg-panel)]/90 backdrop-blur-md sticky top-0 z-20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Título / Marca */}
        <h1
          className="text-3xl text-[var(--color-portal)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Rickpedia
        </h1>

        {/* Botón para abrir el panel de favoritos */}
        <nav>
          <button
            type="button"
            onClick={onOpenPanel}
            aria-label={`Ver favoritos (${total} personajes)`}
            className="flex items-center gap-2 bg-[var(--color-bg-card)] hover:bg-[#122012] border border-[var(--color-portal-dim)]/60 hover:border-[var(--color-portal)]/60 text-[#c8e6c8] font-medium px-4 py-2 rounded-xl transition-all cursor-pointer"
          >
            <span>Favoritos</span>

            {/* Contador reactivo */}
            {total > 0 && (
              <span className="bg-[var(--color-portal)] text-[var(--color-bg-dark)] text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                {total}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
