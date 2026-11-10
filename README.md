# Rickpedia

Buscador de personajes del universo de Rick and Morty. Podés buscar personajes, ver sus datos y guardar tus favoritos — que sobreviven a la recarga.

🔗 **Demo:** [Rickpedia](https://rickpedia-spa.netlify.app/)

---

## ¿Qué hace?

- Busca personajes en la [Rick and Morty API](https://rickandmortyapi.com/documentation) en tiempo real
- Muestra nombre, estado, especie y origen de cada personaje
- Permite guardar y quitar favoritos desde un panel lateral
- Los favoritos persisten en `localStorage` (sobreviven a F5)
- Maneja los estados de carga, error y lista vacía de forma visible

## API utilizada

[Rick and Morty API](https://rickandmortyapi.com/documentation) — pública, sin autenticación, sin API key.

Endpoint de búsqueda: `GET https://rickandmortyapi.com/api/character/?name={query}`

## Tecnologías

- React 19
- Vite
- Tailwind CSS v4
- `fetch` nativo (sin axios)
- Context API para estado global de favoritos
- `localStorage` para persistencia

## Cómo correrlo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Variables de entorno

Este proyecto usa una variable de entorno para la URL base de la API.

Copiá `.env.example` como `.env` y completá los valores:

```bash
cp .env.example .env
```

| Variable | Descripción |
|---|---|
| `VITE_API_BASE_URL` | URL base de la Rick and Morty API |

> Ver `.env.example` para el formato esperado.

## Decisiones técnicas

- **`fetch` sobre axios:** sin dependencias extra, flujo explícito y explicable línea por línea.
- **Context API para favoritos:** los datos de favoritos los consumen tanto las cards como el panel lateral. Evita prop drilling sin agregar librerías externas.
- **Custom hook `useSearch`:** separa la lógica de búsqueda (fetch, loading, error, resultados) del componente que la renderiza.
- **Sin React Router:** la app es una sola vista. El panel lateral resuelve la navegación a favoritos sin necesidad de rutas.
- **Reutilizado de sprint anterior (`mi-watchlist`):** `useLocalStorage`, `useToggle`, estructura de `Navbar`, `ListPanel`, `SearchBar` e `ItemCard` — adaptados a los datos de esta API.

## Estructura de carpetas

```
src/
├── components/
│   ├── CharacterCard.jsx
│   ├── CharacterList.jsx
│   ├── FavoritesPanel.jsx
│   ├── Navbar.jsx
│   ├── SearchBar.jsx
│   └── Spinner.jsx
├── context/
│   └── FavoritesContext.jsx
├── hooks/
│   ├── useLocalStorage.js
│   ├── useSearch.js
│   └── useToggle.js
├── App.jsx
├── main.jsx
└── index.css
```
