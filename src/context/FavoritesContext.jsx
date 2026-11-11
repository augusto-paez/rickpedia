import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

/* -------------------------------------------------
   Creación del contexto
   ------------------------------------------------- */
const FavoritesContext = createContext();

/* -------------------------------------------------
   Provider – envuelve la aplicación
   ------------------------------------------------- */
export function FavoritesProvider({ children }) {
  // clave tal como indica la documentación
  const [favorites, setFavorites] = useLocalStorage(
    'rickpedia:favorites',
    [] // valor por defecto: lista vacía
  );

  /* ---------- helpers ---------- */
  const isInFavorites = character =>
    favorites.some(f => f.id === character.id);

  const toggle = character => {
    setFavorites(prev =>
      prev.some(f => f.id === character.id)
        ? prev.filter(f => f.id !== character.id) // eliminar
        : [...prev,               // agregar
           {
             id: character.id,
             name: character.name,
             status: character.status,
             species: character.species,
             origin: character.origin,
             image: character.image,
           }]
    );
  };

  const remove = character => {
    setFavorites(prev => prev.filter(f => f.id !== character.id));
  };

  const clear = () => setFavorites([]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, isInFavorites, toggle, remove, clear }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

/* -------------------------------------------------
   Hook de conveniencia para consumir el contexto
   ------------------------------------------------- */
// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      'useFavorites debe ser usado dentro de un FavoritesProvider'
    );
  }
  return context;
}