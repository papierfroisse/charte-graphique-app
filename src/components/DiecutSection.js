// src/components/DiecutSection.js
import React, { useState } from 'react';

function DiecutSection({ formData, handleFileChange, nextStep, prevStep }) {
  const [preview, setPreview] = useState(null);

  const handleDiecutUpload = (e) => {
    const file = e.target.files[0];
    handleFileChange(e);
    setPreview(file ? file.name : null); 
  };

  return (
    <div>
      <h2>Fichier Diecut (.ai)</h2>
      <input 
        type="file" 
        name="diecutFile" 
        accept=".ai" 
        onChange={handleDiecutUpload} 
      />
      {preview && <h3>Fichier chargé : {preview}</h3>}
      <br />
      <button onClick={prevStep}>Précédent</button>
      <button onClick={nextStep}>Suivant</button>
    </div>
  );
}

export default DiecutSection;
