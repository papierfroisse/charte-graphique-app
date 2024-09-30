// src/components/GeneralInfo.js
import React from 'react';

function GeneralInfo({ formData, handleInputChange, nextStep }) {
  return (
    <div>
      <h2>Informations Générales</h2>
      <label>
        Nom de la marque:
        <input type="text" name="brandName" value={formData.brandName} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Description:
        <textarea name="brandDescription" value={formData.brandDescription} onChange={handleInputChange}></textarea>
      </label>
      <br />
      <button onClick={nextStep}>Suivant</button>
    </div>
  );
}

export default GeneralInfo;
