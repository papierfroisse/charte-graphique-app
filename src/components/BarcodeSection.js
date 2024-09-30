// src/components/BarcodeSection.js
import React from 'react';

function BarcodeSection({ formData, handleInputChange, nextStep, prevStep }) {
  return (
    <div>
      <h2>Code-barres / QR Code</h2>
      <label>
        Données pour le code-barres/QR Code:
        <input 
          type="text" 
          name="barcodeData" 
          value={formData.barcodeData} 
          onChange={handleInputChange} 
          placeholder="Entrez les données pour générer un code" 
        />
      </label>
      <br />
      <button onClick={prevStep}>Précédent</button>
      <button onClick={nextStep}>Suivant</button>
    </div>
  );
}

export default BarcodeSection;
