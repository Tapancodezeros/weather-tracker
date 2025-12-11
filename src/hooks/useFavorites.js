import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('atmosphere_favorites')) || [];
  });

  useEffect(() => {
    localStorage.setItem('atmosphere_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (city, lat, lon) => {
    const exists = favorites.find((f) => f.name === city);
    if (exists) {
      setFavorites(favorites.filter((f) => f.name !== city));
    } else {
      setFavorites([...favorites, { name: city, lat, lon }]);
    }
  };

  const isFavorite = (cityName) => favorites.some((f) => f.name === cityName);

  return { favorites, toggleFavorite, isFavorite };
};