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
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      {/* Contenedor del panel (evita que el clic interno cierre el overlay) */}
      <aside
        className="w-full max-w-md bg-[#141420] border-l border-gray-800 h-full p-6 flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Cabecera del panel */}
          <div className="flex justify-between items-center border-b border-gray-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">⭐</span>
              <h2 className="text-xl font-bold text-white">
                Favoritos ({favorites.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar panel"
              className="text-gray-400 hover:text-white text-2xl font-bold p-1 cursor-pointer transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Lista de favoritos */}
          <div className="mt-6">
            {favorites.length === 0 ? (
              <div className="text-center py-16 px-4 bg-[#161722]/50 border border-dashed border-gray-800 rounded-xl mt-4">
                <span className="text-4xl block mb-2">🧪</span>
                <p className="text-gray-300 font-medium">No tenés favoritos guardados</p>
                <p className="text-xs text-gray-500 mt-1">
                  Agregá personajes desde la búsqueda para verlos acá.
                </p>
              </div>
            ) : (
              <ul className="space-y-3 max-h-[65vh] overflow-y-auto pr-2">
                {favorites.map((character) => (
                  <li
                    key={character.id}
                    className="flex items-center justify-between bg-[#1c1d2b] p-3 rounded-xl border border-gray-800/80 hover:border-gray-700 transition-all gap-3"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-gray-900"
                      />
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm text-white truncate">
                          {character.name}
                        </h4>
                        <span className="text-xs text-[var(--color-cyan-accent)]">
                          {character.status} • {character.species}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(character)}
                      aria-label={`Quitar ${character.name} de favoritos`}
                      className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold transition-colors flex-shrink-0 cursor-pointer"
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
          <div className="border-t border-gray-800 pt-4 mt-auto">
            <button
              type="button"
              onClick={handleClear}
              className="w-full py-2.5 px-4 bg-rose-900/20 hover:bg-rose-900/40 text-rose-400 border border-rose-800/50 rounded-xl font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              🗑️ Vaciar favoritos
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}