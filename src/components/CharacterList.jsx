import CharacterCard from './CharacterCard';

export default function CharacterList({ items, onClear }) {
  // Estado vacío: no hay resultados para la búsqueda actual
  if (items.length === 0) {
    return (
      <div className="bg-[var(--color-bg-card)] border border-[var(--color-portal-dim)]/30 rounded-2xl p-12 text-center my-8 max-w-lg mx-auto">
        <h3 className="text-lg font-bold text-[#d8f0d8]">
          No se encontraron personajes
        </h3>
        <p className="text-sm text-[#4a6b4a] mt-1">
          Intentá con otro nombre.
        </p>
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="mt-4 px-4 py-2 bg-[var(--color-portal-dim)]/20 hover:bg-[var(--color-portal-dim)]/40 text-sm text-[var(--color-portal)] border border-[var(--color-portal-dim)]/40 font-medium rounded-lg transition-colors cursor-pointer"
          >
            Limpiar búsqueda
          </button>
        )}
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map(character => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </section>
  );
}
