export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-md">
      {/* Ícono SVG de búsqueda */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-portal-dim)]">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Buscar personaje (ej: Rick, Morty)..."
        aria-label="Buscar personajes por nombre"
        className="w-full pl-9 pr-10 py-2.5 bg-[var(--color-bg-card)] border border-[var(--color-portal-dim)]/50 rounded-xl text-[#d8f0d8] placeholder-[#4a6b4a] focus:outline-none focus:border-[var(--color-portal)] focus:ring-1 focus:ring-[var(--color-portal)]/40 transition-all text-sm font-mono"
      />

      {/* Botón limpiar — solo visible cuando hay texto */}
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Limpiar búsqueda"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#4a6b4a] hover:text-[var(--color-portal)] cursor-pointer transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
