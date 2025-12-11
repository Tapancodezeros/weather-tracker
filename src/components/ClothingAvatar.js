import React from 'react';

const ClothingAvatar = ({ temperature, rainCode }) => {
  let emoji = "😎";
  let message = "It's a beautiful day!";
  let top = "T-Shirt";

  if (temperature < 15) { emoji = "🧥"; message = "Bring a jacket!"; top = "Hoodie"; }
  if (temperature < 5) { emoji = "🥶"; message = "Bundle up!"; top = "Heavy Coat"; }
  
  const isRaining = (rainCode >= 51 && rainCode <= 67) || (rainCode >= 80 && rainCode <= 82);
  if (isRaining) { emoji = "☔"; message = "Don't forget your umbrella!"; }

  return (
    <div className="weather-card outfit-card">
      <h3>Smart Outfit</h3>
      <div className="outfit-content">
        <div className="outfit-emoji">{emoji}</div>
        <div className="outfit-details">
          <p><strong>Recommendation:</strong> {top}</p>
          <p className="outfit-msg">{message}</p>
        </div>
      </div>
    </div>
  );
};
export default ClothingAvatar;