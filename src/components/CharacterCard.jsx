import { useFavorites } from '../context/FavoritesContext';

// Mapeo de status a color según la documentación
const STATUS_STYLES = {
  Alive:   'bg-green-500/20 text-green-400 border-green-500/40',
  Dead:    'bg-red-500/20 text-red-400 border-red-500/40',
  unknown: 'bg-gray-500/20 text-gray-400 border-gray-500/40',
};

const STATUS_DOT = {
  Alive:   'bg-green-400',
  Dead:    'bg-red-400',
  unknown: 'bg-gray-400',
};

export default function CharacterCard({ character }) {
  const { isInFavorites, toggle } = useFavorites();
  const inFavorites = isInFavorites(character);

  const statusStyle = STATUS_STYLES[character.status] ?? STATUS_STYLES.unknown;
  const dotStyle    = STATUS_DOT[character.status]    ?? STATUS_DOT.unknown;

  return (
    <article className="bg-[#161722] border border-gray-800 rounded-xl overflow-hidden shadow-lg flex flex-col hover:border-[var(--color-violet-accent)] transition-all duration-300">

      {/* Imagen */}
      <div className="relative h-48 overflow-hidden bg-gray-900">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-300"
        />

        {/* Badge de status sobre la imagen */}
        <span className={`absolute top-2 left-2 flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full border backdrop-blur-sm ${statusStyle}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${dotStyle}`} />
          {character.status}
        </span>
      </div>

      {/* Datos */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="text-base font-bold text-white line-clamp-1">
            {character.name}
          </h3>
          <p className="text-xs text-[var(--color-cyan-accent)] mt-0.5">
            {character.species}
          </p>
          <p className="text-xs text-gray-400 mt-1 line-clamp-1">
            🌍 {character.origin}
          </p>
        </div>

        {/* Botón favoritos */}
        <button
          type="button"
          onClick={() => toggle(character)}
          className={`mt-auto w-full py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer ${
            inFavorites
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30'
              : 'bg-[var(--color-violet-accent)] text-white hover:opacity-90 shadow-md shadow-violet-900/30'
          }`}
        >
          {inFavorites ? '✓ En favoritos' : '+ Agregar a favoritos'}
        </button>
      </div>
    </article>
  );
}