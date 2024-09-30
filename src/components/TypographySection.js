// src/components/TypographySection.js
import React from 'react';

function TypographySection({ formData, handleInputChange, nextStep, prevStep }) {
  return (
    <div>
      <h2>Typographie</h2>
      <label>
        Police pour les titres:
        <input 
          type="text" 
          name="headingFont" 
          value={formData.headingFont} 
          onChange={handleInputChange} 
          placeholder="Entrez la police des titres" 
        />
      </label>
      <br />
      <label>
        Police pour le corps du texte:
        <input 
          type="text" 
          name="bodyFont" 
          value={formData.bodyFont} 
          onChange={handleInputChange} 
          placeholder="Entrez la police du texte" 
        />
      </label>
      <br />
      <button onClick={prevStep}>Précédent</button>
      <button onClick={nextStep}>Suivant</button>
    </div>
  );
}

export default TypographySection;
