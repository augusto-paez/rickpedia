import { useFavorites } from '../context/FavoritesContext';

// Mapeo de status a color según la documentación
const STATUS_STYLES = {
  Alive:   'bg-[var(--color-portal)]/10 text-[var(--color-portal)] border-[var(--color-portal)]/40',
  Dead:    'bg-red-500/20 text-red-400 border-red-500/40',
  unknown: 'bg-gray-500/20 text-gray-400 border-gray-500/40',
};

const STATUS_DOT = {
  Alive:   'bg-[var(--color-portal)] dot-alive',
  Dead:    'bg-red-400',
  unknown: 'bg-gray-400',
};

export default function CharacterCard({ character }) {
  const { isInFavorites, toggle } = useFavorites();
  const inFavorites = isInFavorites(character);

  const statusStyle = STATUS_STYLES[character.status] ?? STATUS_STYLES.unknown;
  const dotStyle    = STATUS_DOT[character.status]    ?? STATUS_DOT.unknown;

  return (
    <article className="card-animate card-glow bg-[var(--color-bg-card)] border border-[var(--color-portal-dim)]/30 rounded-xl overflow-hidden shadow-lg flex flex-col hover:border-[var(--color-portal)]/60 transition-all duration-300">

      {/* Imagen */}
      <div className="relative h-48 overflow-hidden bg-[#030803]">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-300"
        />

        {/* Badge de status sobre la imagen */}
        <span className={`absolute top-2 left-2 flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full border backdrop-blur-sm ${statusStyle}`}>
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotStyle}`} />
          {character.status}
        </span>
      </div>

      {/* Datos */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="text-base font-bold text-[#d8f0d8] line-clamp-1">
            {character.name}
          </h3>
          <p className="text-xs text-[var(--color-portal)] mt-0.5 opacity-80">
            {character.species}
          </p>
          <p className="text-xs text-[#5a8a5a] mt-1 line-clamp-1">
            <span className="text-[#3a6b22]">Origen:</span> {character.origin}
          </p>
        </div>

        {/* Botón favoritos */}
        <button
          type="button"
          onClick={() => toggle(character)}
          className={`mt-auto w-full py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer ${
            inFavorites
              ? 'bg-[var(--color-portal)]/10 text-[var(--color-portal)] border border-[var(--color-portal)]/40 hover:bg-[var(--color-portal)]/20'
              : 'bg-[var(--color-portal-dim)]/30 text-[#c8f0c8] border border-[var(--color-portal-dim)] hover:bg-[var(--color-portal-dim)]/50'
          }`}
        >
          {inFavorites ? 'En favoritos' : 'Agregar a favoritos'}
        </button>
      </div>
    </article>
  );
}
