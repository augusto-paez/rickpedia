import { useEffect } from 'react';
import { useFavorites } from '../context/FavoritesContext';

export default function FavoritesPanel({ isOpen, onClose }) {
  const { favorites, remove, clear } = useFavorites();

  // Escuchar la tecla Escape para cerrar el panel
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClear = () => {
    if (window.confirm('¿Estás seguro de que deseas vaciar todos tus favoritos?')) {
      clear();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Contenedor del panel (evita que el clic interno cierre el overlay) */}
      <aside
        className="panel-enter w-full max-w-md bg-[var(--color-bg-panel)] border-l border-[var(--color-portal-dim)]/40 h-full p-6 flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Cabecera del panel */}
          <div className="flex justify-between items-center border-b border-[var(--color-portal-dim)]/30 pb-4">
            <h2
              className="text-xl text-[var(--color-portal)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Favoritos ({favorites.length})
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar panel"
              className="text-[#4a6b4a] hover:text-[var(--color-portal)] p-1 cursor-pointer transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Lista de favoritos */}
          <div className="mt-6">
            {favorites.length === 0 ? (
              <div className="text-center py-16 px-4 bg-[var(--color-bg-card)] border border-dashed border-[var(--color-portal-dim)]/30 rounded-xl mt-4">
                <p className="text-[#c8e6c8] font-medium">No tenés favoritos guardados</p>
                <p className="text-xs text-[#4a6b4a] mt-1">
                  Agregá personajes desde la búsqueda para verlos acá.
                </p>
              </div>
            ) : (
              <ul className="space-y-3 max-h-[65vh] overflow-y-auto pr-2">
                {favorites.map((character) => (
                  <li
                    key={character.id}
                    className="flex items-center justify-between bg-[var(--color-bg-card)] p-3 rounded-xl border border-[var(--color-portal-dim)]/30 hover:border-[var(--color-portal)]/40 transition-all gap-3"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-[#030803]"
                      />
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm text-[#d8f0d8] truncate">
                          {character.name}
                        </h4>
                        <span className="text-xs text-[var(--color-portal)] opacity-70">
                          {character.status} · {character.species}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(character)}
                      aria-label={`Quitar ${character.name} de favoritos`}
                      className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-xs font-semibold transition-colors flex-shrink-0 cursor-pointer"
                    >
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Botón vaciar lista al pie */}
        {favorites.length > 0 && (
          <div className="border-t border-[var(--color-portal-dim)]/30 pt-4 mt-auto">
            <button
              type="button"
              onClick={handleClear}
              className="w-full py-2.5 px-4 bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-800/50 rounded-xl font-semibold text-sm transition-all cursor-pointer"
            >
              Vaciar favoritos
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
